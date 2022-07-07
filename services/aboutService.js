const AboutUsNumber = require("../models/aboutUsNumber");
const AboutUsText = require("../models/aboutUsText");

class AboutService {
  constructor(sobreNos) {
    this.allItems = [...sobreNos.texts, ...sobreNos.numbers];
  }

  async updateAllItems() {
    for (const [i, item] of this.allItems.entries()) {
      const res = await AboutUsText.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: item };
        if (item.number) {
          await AboutUsNumber.findByIdAndUpdate(id, update, { new: true });
        } else {
          await AboutUsText.findByIdAndUpdate(id, update, { new: true });
        }
      } else {
        throw Error("error fetching about items");
      }
    }
  }

  async postAllNewItems() {
    const res = await AboutUsText.find({});
    if (res) {
      if (this.allItems.length > res.length)
        for (const [i, item] of this.allItems.entries()) {
          if (i >= res.length) {
            if (item.number) {
              let newItem = new AboutUsNumber(item);
              newItem.arrayPos = i;
              await newItem.save();
            } else {
              let newItem = new AboutUsText(item);
              newItem.arrayPos = i;
              await newItem.save();
            }
          }
        }
    } else {
      throw Error("error creating about items");
    }
  }
}

module.exports = AboutService;
