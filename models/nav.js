const mongoose = require("mongoose");
const { Schema } = mongoose;

const NavSchema = new Schema({
  arrayPos: Number,
  type: { type: String, required: true },
  htmlTag: { type: String, required: true },
  key: { type: String, required: true },
  href: { type: String, required: true },
  text: { type: String, required: true },
  style: {},
});

module.exports = mongoose.model("nav", NavSchema);
