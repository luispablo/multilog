var chalk = require("chalk");
var Level = require("./Level");

module.exports = function (cons, level) {

	var myLevel = Level().of(level);

	function doLog (message, messageLevel) {
		if (!myLevel.isGreaterThan(messageLevel)) cons.log(message);
	}

	return {
		level: level,
		debug: function (message) {
			doLog(chalk.green.bold("DEBUG") +": "+ chalk.green(message), myLevel.DEBUG);
		},
		warn: function (message) {
			doLog(chalk.yellow.bold("WARN") +": "+ chalk.yellow(message), myLevel.WARN);
		},
		info: function (message) {
			doLog(chalk.bold("INFO") +": "+ message, myLevel.INFO);
		},
		error: function (error) {
			doLog(chalk.red.bold("ERROR:") +" "+ chalk.red(JSON.stringify(error)), myLevel.ERROR);
		}
	};
};
