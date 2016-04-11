module.exports = function (loggers) {
	return {
		getLoggers () {
			return loggers;
		},
		info (message) {
			loggers.forEach(logger => logger.info(message));
		},
		error (errorObject) {
			loggers.forEach(logger => logger.error(errorObject));
		}
	};
};
