const ConsoleLogger = require("./ConsoleLogger");
const GELFLogger = require("./GELFLogger");
const gelfPro = require("gelf-pro");

const BUILDER_FUNCTIONS = {
	console (level) {
		return ConsoleLogger(console, level);
	},
	gelf (level, config) {
		return GELFLogger(gelfPro, config, level);
	}
};

module.exports = function (properties) {
	return BUILDER_FUNCTIONS[properties.name](properties.level, properties.config);
};
