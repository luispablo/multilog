const ConsoleLogger = require("./ConsoleLogger");
const GELFLogger = require("./GELFLogger");
const gelfPro = require("gelf-pro");

const BUILDER_FUNCTIONS = {
	console () {
		return ConsoleLogger(console);
	},
	gelf (config) {
		return GELFLogger(gelfPro, config);
	}
};

module.exports = function (properties) {
	return BUILDER_FUNCTIONS[properties.name](properties.config);
};
