const Deposition = require("../models/deposition");
const DepositionText = require("../models/depositionText");

class DepositionService {
  constructor(depoimento) {
    this.allItems = [...depoimento.depoimentos, ...depoimento.texts];
  }
  async updateAllItems() {
    for (const [i, item] of this.allItems.entries()) {
      const res = await Deposition.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: item };
        if (item.deposition) {
          await Deposition.findByIdAndUpdate(id, update, { new: true });
        } else {
          await DepositionText.findByIdAndUpdate(id, update, { new: true });
        }
      } else {
        throw Error("error fetching deposition items");
      }
    }
  }
  async postAllNewItems() {
    const res = await Deposition.find({});
    if (res) {
      if (this.allItems.length > res.length)
        for (const [i, item] of this.allItems.entries()) {
          if (i >= res.length) {
            if (item.deposition) {
              let newItem = new Deposition(item);
              newItem.arrayPos = i;
              await newItem.save();
            } else {
              let newItem = new DepositionText(item);
              newItem.arrayPos = i;
              await newItem.save();
            }
          }
        }
    } else {
      throw Error("error creating deposition items");
    }
  }
}

module.exports = DepositionService;
