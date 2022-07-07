const Functionality = require("../models/functionality");
const FunctionalityText = require("../models/functionalityText");

class FunctionalityService {
  constructor(funcionalidade) {
    this.allItems = [
      ...funcionalidade.texts,
      ...funcionalidade.funcionalidades,
    ];
  }

  async updateAllItems() {
    for (const [i, item] of this.allItems.entries()) {
      const res = await Functionality.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: item };
        if (item.knowMoreLink) {
          await Functionality.findByIdAndUpdate(id, update, { new: true });
        } else {
          await FunctionalityText.findByIdAndUpdate(id, update, { new: true });
        }
      } else {
        throw Error("error fetching functionality items");
      }
    }
  }
  async postAllNewItems() {
    const res = await Functionality.find({});
    if (res) {
      if (this.allItems.length > res.length)
        for (const [i, item] of this.allItems.entries()) {
          if (i >= res.length) {
            if (item.knowMoreLink) {
              let newItem = new Functionality(item);
              newItem.arrayPos = i;
              await newItem.save();
            } else {
              let newItem = new FunctionalityText(item);
              newItem.arrayPos = i;
              await newItem.save();
            }
          }
        }
    } else {
      throw Error("error creating functionality items");
    }
  }
}

module.exports = FunctionalityService;
