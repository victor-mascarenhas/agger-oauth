const mongoose = require("mongoose");
const { Schema } = mongoose;

const aboutUsNumberSchema = new Schema({
  arrayPos: { type: Number },
  key: { type: String },
  type: { type: String },

  number: {
    type: { type: String },
    htmlTag: { type: String },
    key: { type: String },
    text: { type: String },
    style: { type: Object },
  },
});

module.exports = mongoose.model("aboutUsNumber", aboutUsNumberSchema, "about");
