const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Functionality = require("../../models/functionality")
const FunctionalityText = require("../../models/functionalityText")
const MSGS = require("../../messages");

// @route    GET /functionality
// @desc     LIST functionality items
// @access   Public
router.get("/", async (req, res, next) => {
  try {
    const functionalityItems = await Functionality.find({});
    res.json(functionalityItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /functionality/:id
// @desc     get a especific functionality item
// @access   Public
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const functionalityItem = await Functionality.findById(id);

    if (functionalityItem) {
      res.json(functionalityItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /functionality
// @desc     create functionality item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const items = await Functionality.find({})
      if(items){
      const orderNumb = items.length;
      let newItem = null
      if(req.body.knowMoreLink){
        newItem = new Functionality(req.body);
        newItem.arrayPos = orderNumb
        await newItem.save();
      }else{
        newItem = new FunctionalityText(req.body);
        newItem.arrayPos = orderNumb
        await newItem.save();
      }
        if (newItem) {
          res.json(newItem);
        } else {
          res.status(401).send({ msg: "Invalid Data" });
        }
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);


//@route   DELETE/functionality/:id
//@desc    DELETE functionality item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const functionalityItem = await Functionality.findOneAndDelete({ _id: id });

    if (functionalityItem) {
      res.json(functionalityItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /functionality/:id
// @desc     PARTIAL EDIT functionality item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const functionalityItem = await Functionality.findByIdAndUpdate(id, update, { new: true });
      if (functionalityItem) {
        res.send(functionalityItem);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);


module.exports = router;
