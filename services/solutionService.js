const Solutions = require("../models/solutions");

class SolutionsService {
  constructor(nossasSolucoes) {
    this.texts = nossasSolucoes.texts;
  }

  async updateAllTextItems() {
    for (const [i, textItem] of this.texts.entries()) {
      const res = await Solutions.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: textItem };
        await Solutions.findByIdAndUpdate(id, update, { new: true });
      } else {
        throw Error("error fetching solutions items");
      }
    }
  }

  async postAllNewItems() {
    const res = await Solutions.find({});
    if (res) {
      if (this.texts.length > res.length)
        for (const [i, item] of this.texts.entries()) {
          if (i >= res.length) {
            let newItem = new Solutions(item);
            newItem.arrayPos = i;
            await newItem.save();
          }
        }
    } else {
      throw Error("error creating solutions items");
    }
  }
}

module.exports = SolutionsService;
