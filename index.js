const Builder = require("./lib/Builder");
const MultiLogger = require("./lib/MultiLogger");

module.exports = function (properties) {
	const loggers = properties.map(props => Builder(props));

	return MultiLogger(loggers);
};
