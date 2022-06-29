const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Solutions = require("../../models/solutions")
const MSGS = require("../../messages");

// @route    GET /solutions
// @desc     LIST solutions items
// @access   Private
router.get("/", auth, async (req, res, next) => {
  try {
    const solutions = await Solutions.find({});
    res.json(solutions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /solutions/:id
// @desc     get a especific solutions item
// @access   Private
router.get("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const solution = await Solutions.findById(id);

    if (solution) {
      res.json(solution);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /solutions
// @desc     create solutions item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const items = await Solutions.find({})
      if(items){
      const orderNumb = items.length;
        let newSolution = new Solutions(req.body);
        newSolution.arrayPos = orderNumb
        await newSolution.save();

        if (newSolution) {
          res.json(newSolution);
        } else {
          res.status(401).send({ msg: "Invalid Data" });
        }
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

//@route   DELETE/solutions/:id
//@desc    DELETE solutions item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const solution = await Solutions.findOneAndDelete({ _id: id });

    if (solution) {
      res.json(solution);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /solutions/:id
// @desc     PARTIAL EDIT solutions item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const solution = await Solutions.findByIdAndUpdate(id, update, { new: true });
      if (solution) {
        res.send(solution);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
