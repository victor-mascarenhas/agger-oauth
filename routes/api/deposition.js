const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Deposition = require("../../models/deposition")
const DepositionText = require("../../models/depositionText")
const MSGS = require("../../messages");

// @route    GET /deposition
// @desc     LIST deposition items
// @access   Public
router.get("/", async (req, res, next) => {
  try {
    const depositionItems = await Deposition.find({});
    res.json(depositionItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /deposition/:id
// @desc     get a especific deposition item
// @access   Public
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const depositionItem = await Deposition.findById(id);

    if (depositionItem) {
      res.json(depositionItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /deposition
// @desc     create deposition item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const items = await Deposition.find({})
      if(items){
        const orderNumb = items.length;
      let newItem = null
      if(req.body.deposition){
        newItem = new Deposition(req.body);
        newItem.arrayPos = orderNumb
        await newItem.save();
      }else{
        newItem = new DepositionText(req.body);
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


//@route   DELETE/deposition/:id
//@desc    DELETE deposition item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const depositionItem = await Deposition.findOneAndDelete({ _id: id });

    if (depositionItem) {
      res.json(depositionItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /deposition/:id
// @desc     PARTIAL EDIT deposition item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const depositionItem = await Deposition.findByIdAndUpdate(id, update, { new: true });
      if (depositionItem) {
        res.send(depositionItem);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);


module.exports = router;
