const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Plan = require("../../models/plan")
const PlanText = require("../../models/planText")
const MSGS = require("../../messages");

// @route    GET /plan
// @desc     LIST plan items
// @access   Public
router.get("/", async (req, res, next) => {
  try {
    const planItems = await Plan.find({});
    res.json(planItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /plan/:id
// @desc     get a especific plan item
// @access   Public
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const planItem = await Plan.findById(id);

    if (planItem) {
      res.json(planItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /plan
// @desc     create plan item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const items = await Plan.find({})
      if(items){
      const orderNumb = items.length;
      let newItem = null
      if(req.body.packageItens){
        newItem = new Plan(req.body);
        newItem.arrayPos = orderNumb
        await newItem.save();
      }else{
        newItem = new PlanText(req.body);
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


//@route   DELETE/plan/:id
//@desc    DELETE plan item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const planItem = await Plan.findOneAndDelete({ _id: id });

    if (planItem) {
      res.json(planItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /plan/:id
// @desc     PARTIAL EDIT plan item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const planItem = await Plan.findByIdAndUpdate(id, update, { new: true });
      if (planItem) {
        res.send(planItem);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);


module.exports = router;
