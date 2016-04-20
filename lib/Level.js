module.exports = function () {

	const DEBUG = "DEBUG";
	const INFO = "INFO";
	const WARN = "WARN";
	const ERROR = "ERROR";

	const levels = [DEBUG, INFO, WARN, ERROR];

	return {
		DEBUG: DEBUG, INFO: INFO, WARN: WARN, ERROR: ERROR,
		of (level) {
			this.level = level;
			return this;
		},
		isGreaterThan (otherLevel) {
			return levels.indexOf(this.level) > levels.indexOf(otherLevel);
		}
	};
};
