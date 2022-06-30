const mongoose = require("mongoose");
const { Schema } = mongoose;

const planSchema = new Schema({
  arrayPos: { type: Number },
  type: { type: String },
  title: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
  description: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
  packageItens: [],
  licenceQuantity: [String],
  price: [
    {
      type: String,
      htmlTag: String,
      key: String,
      text: String,
      style: { type: Object },
    },
  ],
  buyButton: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
});

module.exports = mongoose.model("plan", planSchema, "plan");
