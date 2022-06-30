const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  arrayPos: Number,
  type: { type: String },
  htmlTag: { type: String },
  key: { type: String },
  text: { type: String },
  style: { type: Object },
});

module.exports = mongoose.model("contact", contactSchema);
