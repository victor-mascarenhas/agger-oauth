const mongoose = require("mongoose");
const { Schema } = mongoose;

const solutionsSchema = new Schema({
  arrayPos: { type: Number },
  type: { type: String },
  htmlTag: { type: String },
  key: { type: String },
  text: { type: String },
  style: { type: Object },
});

module.exports = mongoose.model("solutions", solutionsSchema);
