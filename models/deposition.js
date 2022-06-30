const mongoose = require("mongoose");
const { Schema } = mongoose;

const depositionSchema = new Schema({
  arrayPos: { type: Number },
  key: { type: String },
  type: { type: String },

  name: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
  profession: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
  deposition: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
});

module.exports = mongoose.model("deposition", depositionSchema, "deposition");
