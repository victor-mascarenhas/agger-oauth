const Plan = require("../models/plan");
const PlanText = require("../models/planText");

class PlanService {
  constructor(plano) {
    this.allItems = [...plano.texts, ...plano.planos];
  }

  async updateAllItems() {
    for (const [i, item] of this.allItems.entries()) {
      const res = await Plan.find({});
      if (res) {
        const id = res[i]._id;
        const update = { $set: item };
        if (item.packageItens) {
          await Plan.findByIdAndUpdate(id, update, { new: true });
        } else {
          await PlanText.findByIdAndUpdate(id, update, { new: true });
        }
      } else {
        throw Error("error fetching plan items");
      }
    }
  }

  async postAllNewItems() {
    const res = await Plan.find({});
    if (res) {
      if (this.allItems.length > res.length)
        for (const [i, item] of this.allItems.entries()) {
          if (i >= res.length) {
            if (item.packageItens) {
              let newItem = new Plan(item);
              newItem.arrayPos = i;
              await newItem.save();
            } else {
              let newItem = new PlanText(item);
              newItem.arrayPos = i;
              await newItem.save();
            }
          }
        }
    } else {
      throw Error("error creating plan items");
    }
  }
}

module.exports = PlanService;
