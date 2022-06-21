const express = require("express");
const app = express();
const connectDB = require("./config/db");
const bodyparser = require("body-parser");
const cors = require("cors");
const config = require("config");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const auth = require("./middlewares/auth");

//ENV
const PORT = process.env.PORT || 4646;
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || config.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || config.get("GOOGLE_CLIENT_SECRET");
const SERVER_ROOT_URI =
  process.env.SERVER_ROOT_URI || config.get("SERVER_ROOT_URI");
const UI_ROOT_URI = process.env.UI_ROOT_URI || config.get("UI_ROOT_URI");
const JWT_SECRET = process.env.jwtSecret || config.get("jwtSecret");

//Middlewares
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(
  cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: UI_ROOT_URI,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  })
);

//Mongo Connect
connectDB();

const redirectURI = "auth/google";
function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}
function getTokens({ code, clientId, clientSecret, redirectUri }) {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      console.error(`Failed to fetch auth tokens`);
    });
}

//Routes
app.get("/auth/google/url", (req, res) => {
  return res.send(getGoogleAuthURL());
});

// Getting the user from Google with the code
app.get(`/${redirectURI}`, async (req, res) => {
  const code = req.query.code;
  console.log("init get user");

  const { id_token, access_token } = await getTokens({
    code,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
  });

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      console.error(`Failed to fetch user`);
    });

  const payload = {
    user: googleUser,
  };
  jwt.sign(payload, JWT_SECRET, { expiresIn: "5 days" }, (err, token) => {
    if (err) throw err;
    payload.token = token;
    res.json(payload);
  });

  res.redirect(UI_ROOT_URI);
});

// Getting the current user
app.get("/auth/me", auth, (req, res) => {
  try {
    const user = req.user;
    console.log("decoded", user);
    return res.send(user);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

app.get("/", (req, res) => res.send("Hello!"));
app.use("/user", require("./routes/api/user"));
app.use("/auth", require("./routes/api/auth"));

const server = app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

module.exports = { app, server };
