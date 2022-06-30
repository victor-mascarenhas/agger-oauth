const mongoose = require("mongoose");
const { Schema } = mongoose;

const NavSchema = new Schema({
  arrayPos: Number,
  type: { type: String },
  htmlTag: { type: String },
  key: { type: String },
  href: { type: String },
  text: { type: String },
  style: { type: Object },
});

module.exports = mongoose.model("nav", NavSchema);
