const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const AboutUsNumber = require("../../models/aboutUsNumber")
const AboutUsText = require("../../models/aboutUsText")
const MSGS = require("../../messages");

// @route    GET /about
// @desc     LIST about items
// @access   Public
router.get("/", async (req, res, next) => {
  try {
    const aboutItems = await AboutUsText.find({});
    res.json(aboutItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /about/:id
// @desc     get a especific about item
// @access   Public
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const aboutItems = await AboutUsText.findById(id);

    if (aboutItems) {
      res.json(aboutItems);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /about
// @desc     create about item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const items = await AboutUsText.find({})
      if(items){
      const orderNumb = items.length;

      let newItem = null
      if(req.body.number){
        
        newItem = new AboutUsNumber(req.body);
        newItem.arrayPos = orderNumb
        await newItem.save();
      }else{
        newItem = new AboutUsText(req.body);
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


//@route   DELETE/about/:id
//@desc    DELETE about item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const aboutItems = await AboutUsText.findOneAndDelete({ _id: id });

    if (aboutItems) {
      res.json(aboutItems);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /about/:id
// @desc     PARTIAL EDIT about item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const aboutItems = await AboutUsText.findByIdAndUpdate(id, update, { new: true });
      if (aboutItems) {
        res.send(aboutItems);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);


module.exports = router;
