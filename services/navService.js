const Nav = require("../models/nav");

class NavService {
  constructor(nav) {
    this.texts = nav.texts;
  }

  async updateAllTextItems() {
    for (const [i, textItem] of this.texts.entries()) {
      const res = await Nav.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: textItem };
        await Nav.findByIdAndUpdate(id, update, { new: true });
      } else {
        throw Error("error fetching nav items");
      }
    }
  }

  async postAllNewItems() {
    const res = await Nav.find({});
    if (res) {
      if (this.texts.length > res.length)
        for (const [i, item] of this.texts.entries()) {
          if (i >= res.length) {
            let newItem = new Nav(item);
            newItem.arrayPos = i;
            await newItem.save();
          }
        }
    } else {
      throw Error("error creating nav items");
    }
  }
}

module.exports = NavService;
