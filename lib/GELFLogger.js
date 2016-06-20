var Level = require("./Level");

module.exports = function (gelflog, config, level) {
	var myLevel = Level().of(level);

	gelflog.setConfig(config);

	return {
		level: level,
		debug: function (message) {
			if (!myLevel.isGreaterThan(myLevel.DEBUG)) gelflog.debug(message);
		},
		warn: function (message) {
			if (!myLevel.isGreaterThan(myLevel.WARN)) gelflog.warn(message);
		},
		info: function (message) {
			if (!myLevel.isGreaterThan(myLevel.INFO)) gelflog.info(message);
		},
		error: function (error) {
			if (!myLevel.isGreaterThan(myLevel.ERROR)) gelflog.error(JSON.stringify(error));
		}
	};
};
