const NavService = require("./navService");
const ContactService = require("./contactService");
const AboutService = require("./aboutService");
const DepositionService = require("./depositionService");
const SolutionsService = require("./solutionService");
const FunctionalityService = require("./functionalityService");
const PlanService = require("./planService");

const updateService = async (key, data) => {
  switch (key) {
    case "nav":
      const nav = new NavService(data);
      return nav.updateAllTextItems();
    case "contato":
      const contact = new ContactService(data);
      return contact.updateAllTextItems();
    case "sobreNos":
      const about = new AboutService(data);
      return about.updateAllItems();
    case "depoimento":
      const deposition = new DepositionService(data);
      return deposition.updateAllItems();
    case "nossasSolucoes":
      const solutions = new SolutionsService(data);
      return solutions.updateAllTextItems();
    case "funcionalidade":
      const functionalities = new FunctionalityService(data);
      return functionalities.updateAllItems();
    case "plano":
      const plan = new PlanService(data);
      return plan.updateAllItems();

    default:
      return console.log("switch fail");
  }
};
const postService = async (key, data) => {
  switch (key) {
    case "nav":
      const nav = new NavService(data);
      return nav.postAllNewItems();
    case "contato":
      const contact = new ContactService(data);
      return contact.postAllNewItems();
    case "sobreNos":
      const about = new AboutService(data);
      return about.postAllNewItems();
    case "depoimento":
      const deposition = new DepositionService(data);
      return deposition.postAllNewItems();
    case "nossasSolucoes":
      const solutions = new SolutionsService(data);
      return solutions.postAllNewItems();
    case "funcionalidade":
      const functionalities = new FunctionalityService(data);
      return functionalities.postAllNewItems();
    case "plano":
      const plan = new PlanService(data);
      return plan.postAllNewItems();

    default:
      return console.log("switch fail");
  }
};
module.exports = { updateService, postService };
