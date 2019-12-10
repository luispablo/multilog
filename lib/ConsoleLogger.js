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
      let message = chalk.red("\n\n// --------## ERROR -------------------------------------------->\n");

      if (error.message && !error.stack || error.stack.indexOf(error.message) < 0) {
        message += chalk.red.bold(`\n${error.message}\n`);
      }
      if (error.stack) {
        message += chalk.red(`\n${error.stack}\n`);
      }
      if (Object.keys(error).length > 0) {
        message += chalk.red(`\n${JSON.stringify(error, null, 2)}\n`);
      }

      message += chalk.red("\n\n// -------------------------------------------------------------> \n\n");

      doLog(message, myLevel.ERROR);
    }
  };
};
