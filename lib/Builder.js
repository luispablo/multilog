var ConsoleLogger = require("./ConsoleLogger");
var GELFLogger = require("./GELFLogger");
var gelfPro = require("gelf-pro");

var BUILDER_FUNCTIONS = {
  console: function (level) {
    return ConsoleLogger(console, level);
  },
  gelf: function (level, config) {
    return GELFLogger(gelfPro, config, level);
  }
};

module.exports = function (properties) {
  return BUILDER_FUNCTIONS[properties.name](properties.level, properties.config);
};
