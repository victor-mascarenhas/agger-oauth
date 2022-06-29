const mongoose = require("mongoose");
const { Schema } = mongoose;

const functionalitySchema = new Schema({
  arrayPos: {type: Number},
  key: { type: String, required: true},
  type: { type: String, required: true },
  icon: { type: String, required: true },
  title: {
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
  description: {
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
  popUpButton: {
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
  knowMoreLink: {
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

module.exports = mongoose.model("functionality", functionalitySchema, 'functionality');
