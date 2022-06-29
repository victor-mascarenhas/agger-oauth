const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Contact = require("../../models/contact")
const MSGS = require("../../messages");

// @route    GET /contact
// @desc     LIST contact items
// @access   Private
router.get("/", auth, async (req, res, next) => {
  try {
    const contatos = await Contact.find({});
    res.json(contatos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    GET /contact/:id
// @desc     get a especific contact item
// @access   Private
router.get("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const contactItem = await Contact.findById(id);

    if (contactItem) {
      res.json(contactItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    POST /contact
// @desc     create contact item
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const contatos = await Contact.find({});
      if(contatos){
        const orderNumb = contatos.length;
        let newContactItem = new Contact(req.body);
        newContactItem.arrayPos = orderNumb
        await newContactItem.save();

        if (newContactItem) {
          res.json(newContactItem);
        } else {
          res.status(401).send({ msg: "Invalid Data" });
        }
      }
      
        
      
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

//@route   DELETE/contact/:id
//@desc    DELETE contact item
//@access  Private
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const contactItem = await Contact.findOneAndDelete({ _id: id });

    if (contactItem) {
      res.json(contactItem);
    } else {
      res.status(404).send({ msg: "Item not found "});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: MSGS.GENERIC_ERROR });
  }
});

// @route    PATCH /contact/:id
// @desc     PARTIAL EDIT contact item
// @access   Private
router.patch(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const update = { $set: req.body };
      const contactItem = await Contact.findByIdAndUpdate(id, update, { new: true });
      if (contactItem) {
        res.send(contactItem);
      } else {
        res.status(404).send({ msg: "Item not found "});
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
