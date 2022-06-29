const mongoose = require("mongoose");
const { Schema } = mongoose;

const planSchema = new Schema({
  arrayPos: {type: Number},
  type: { type: String, required: true },
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
  packageItens: [{
    type: String,
    htmlTag: String,
    key: String,
    text: String,
    style: { 
      color: String,
      fontSize: String,
      fontFamily: String
    },

  }],
  licenceQuantity: [String],
  price:[{
    type: String,
    htmlTag: String,
    key: String,
    text: String,
    style: { 
      color: String,
      fontSize: String,
      fontFamily: String
    },
  }],
  buyButton: {
    type: { type: String, required: true },
    htmlTag: { type: String, required: true}, 
    key: { type: String, required: true}, 
    text: { type: String, required: true},
    style: { 
      color: String,
      fontSize: String,
      fontFamily: String
    },
  }
  
});

module.exports = mongoose.model("plan", planSchema, 'plan');
