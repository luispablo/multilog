const chalk = require("chalk");

module.exports = function (cons) {
	return {
		info (message) {
			cons.log(`INFO: ${message}`);
		},
		error (error) {
			cons.log(`${chalk.red.bold("ERROR:")} ${chalk.red(JSON.stringify(error))}`);
		}
	};
};
