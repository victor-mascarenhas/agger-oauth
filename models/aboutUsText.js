const mongoose = require("mongoose");
const { Schema } = mongoose;

const aboutUsTextSchema = new Schema({
  arrayPos: {type: Number},
  type: { type: String, required: true },
  htmlTag: { type: String, required: true},
  key: { type: String, required: true},
  text: { type: String, required: true},
  style: { 
    color: String,
    fontSize: String,
    fontFamily: String
  },
});

module.exports = mongoose.model("aboutUsText", aboutUsTextSchema, 'about');
