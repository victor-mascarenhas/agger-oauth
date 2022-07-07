const Contact = require("../models/contact");

class ContactService {
  constructor(contato) {
    this.texts = contato.texts;
  }

  async updateAllTextItems() {
    for (const [i, textItem] of this.texts.entries()) {
      const res = await Contact.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: textItem };
        await Contact.findByIdAndUpdate(id, update, { new: true });
      } else {
        throw Error("error fetching contact items");
      }
    }
  }

  async postAllNewItems() {
    const res = await Contact.find({});
    if (res) {
      if (this.texts.length > res.length)
        for (const [i, item] of this.texts.entries()) {
          if (i >= res.length) {
            let newItem = new Contact(item);
            newItem.arrayPos = i;
            await newItem.save();
          }
        }
    } else {
      throw Error("error creating contact items");
    }
  }
}

module.exports = ContactService;
