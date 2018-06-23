const configuration = require("../../config");
const defaults = configuration.database.redux.defaults;
const {
  packageName,
    author,
    paramStructure
} = defaults;

module.exports = {
    packageName,
    author,
    paramStructure
};
