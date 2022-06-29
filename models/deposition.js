const mongoose = require("mongoose");
const { Schema } = mongoose;

const depositionSchema = new Schema({
  arrayPos: {type: Number},
  key: { type: String, required: true},
  type: { type: String, required: true },

  name: {
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
  profession: {
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
  deposition: {
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

module.exports = mongoose.model("deposition", depositionSchema, 'deposition');
