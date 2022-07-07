const express = require("express");
const app = express();
const connectDB = require("./config/db");
const bodyparser = require("body-parser");
const cors = require("cors");

//ENV
const PORT = process.env.PORT || 4646;

//Middlewares
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

//Mongo Connect
connectDB();

//Routes
app.get("/", (req, res) => res.send("Hello!"));
app.use("/user", require("./routes/api/user"));
app.use("/auth", require("./routes/api/auth"));
app.use("/nav", require("./routes/api/nav"));
app.use("/contact", require("./routes/api/contact"));
app.use("/about-us", require("./routes/api/about"));
app.use("/deposition", require("./routes/api/deposition"));
app.use("/solutions", require("./routes/api/solutions"));
app.use("/functionality", require("./routes/api/functionality"));
app.use("/plan", require("./routes/api/plan"));
app.use("/all", require("./routes/api/all"));

const server = app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

module.exports = { app, server };
