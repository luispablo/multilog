const chalk = require("chalk");
const Level = require("./Level");

module.exports = function (cons, level) {

	const myLevel = Level().of(level);

	function doLog (message, messageLevel) {
		if (!myLevel.isGreaterThan(messageLevel)) cons.log(message);
	}

	return {
		level: level,
		debug (message) {
			doLog(`${chalk.green.bold("DEBUG")}: ${chalk.green(message)}`, myLevel.DEBUG);
		},
		warn (message) {
			doLog(`${chalk.yellow.bold("WARN")}: ${chalk.yellow(message)}`, myLevel.WARN);
		},
		info (message) {
			doLog(`${chalk.bold("INFO")}: ${message}`, myLevel.INFO);
		},
		error (error) {
			doLog(`${chalk.red.bold("ERROR:")} ${chalk.red(JSON.stringify(error))}`, myLevel.ERROR);
		}
	};
};
