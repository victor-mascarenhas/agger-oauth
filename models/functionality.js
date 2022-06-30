const mongoose = require("mongoose");
const { Schema } = mongoose;

const functionalitySchema = new Schema({
  arrayPos: { type: Number },
  key: { type: String },
  type: { type: String },
  icon: { type: String },
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
  popUpButton: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
  knowMoreLink: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
});

module.exports = mongoose.model(
  "functionality",
  functionalitySchema,
  "functionality"
);
