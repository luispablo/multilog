var Builder = require("./lib/Builder");
var MultiLogger = require("./lib/MultiLogger");

module.exports = function (properties) {
  var loggers = properties.map(function (props) { return Builder(props); });

  return MultiLogger(loggers);
};
