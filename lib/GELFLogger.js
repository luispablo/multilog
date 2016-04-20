const Level = require("./Level");

module.exports = function (gelflog, config, level) {
	const myLevel = Level().of(level);

	gelflog.setConfig(config);

	return {
		level: level,
		debug (message) {
			if (!myLevel.isGreaterThan(myLevel.DEBUG)) gelflog.debug(message);
		},
		warn (message) {
			if (!myLevel.isGreaterThan(myLevel.WARN)) gelflog.warn(message);
		},
		info (message) {
			if (!myLevel.isGreaterThan(myLevel.INFO)) gelflog.info(message);
		},
		error (error) {
			if (!myLevel.isGreaterThan(myLevel.ERROR)) gelflog.error(JSON.stringify(error));
		}
	};
};
