const mongoose = require("mongoose");
const { Schema } = mongoose;

const aboutUsNumberSchema = new Schema({
  arrayPos: {type: Number},
  key: { type: String, required: true},
  type: { type: String, required: true },

  number: {
    type: { type: String, required: true },
    htmlTag: { type: String, required: true},
    key: { type: String, required: true},
    text: { type: String, required: true},
    style: { 
      color: String,
      fontSize: String,
      fontFamily: String
    },
  },
});

module.exports = mongoose.model("aboutUsNumber", aboutUsNumberSchema, 'about');
