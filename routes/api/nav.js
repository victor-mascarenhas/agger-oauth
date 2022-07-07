const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Nav = require("../../models/nav");
const MSGS = require("../../messages");

// @route    GET /nav
// @desc     LIST nav items
// @access   Private
router.get("/", async (req, res, next) => {
  try {
    const navItems = await Nav.find({});
    res.json(navItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /nav/:id
// @desc     get a especific nav item
// @access   Private
router.get("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const navItem = await Nav.findById(id);

    if (navItem) {
      res.json(navItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /nav
// @desc     create nav item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const items = await Nav.find({});
      if(items){
        const orderNumb = items.length;
        let newNavItem = new Nav(req.body);
        newNavItem.arrayPos = orderNumb
        await newNavItem.save();

        if (newNavItem) {
          res.json(newNavItem);
        } else {
          res.status(401).send({ msg: "Invalid Data" });
        }
      }
      
      
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

//@route   DELETE/nav/:id
//@desc    DELETE nav item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const navItem = await Nav.findOneAndDelete({ _id: id });

    if (navItem) {
      res.json(navItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /nav/:id
// @desc     PARTIAL EDIT nav item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const navItem = await Nav.findByIdAndUpdate(id, update, { new: true });
      if (navItem) {
        res.send(navItem);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
