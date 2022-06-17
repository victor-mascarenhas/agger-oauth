const jwt = require("jsonwebtoken");
const config = require("config");
const MSGS = require("../messages");

module.exports = function (req, res, next) {
  const jwtSecret = process.env.jwtSecret || config.get("jwtSecret");
  const COOKIE_NAME = process.env.COOKIE_NAME || config.get("COOKIE_NAME");

  // Get token from header
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ msg: MSGS.WITHOUT_TOKEN });
  }

  try {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: MSGS.INVALID_TOKEN });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: MSGS.GENERIC_ERROR });
  }
};
