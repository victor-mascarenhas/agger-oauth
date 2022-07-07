const express = require("express");
const router = express.Router();
const MSGS = require("../../messages");
const auth = require("../../middlewares/auth");
const { updateService, postService } = require("../../services");

// @route    PATCH /all
// @desc     PATCH All items at once
// @access   Private
router.patch("/", async (req, res, next) => {
  try {
    const payload = req.body;
    Object.keys(payload).forEach((key) => {
      setTimeout(function () {
        updateService(key, payload[key]);
      }, 0);
    });

    res.status(204).send("updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /all
// @desc     POST All items at once
// @access   Private
router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    Object.keys(payload).forEach((key) => {
      setTimeout(function () {
        postService(key, payload[key]);
      }, 0);
    });

    res.status(201).send("created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

module.exports = router;
