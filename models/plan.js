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
  prices: [],
  buyButton: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
});

module.exports = mongoose.model("plan", planSchema, "plan");
