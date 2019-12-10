module.exports = function (loggers) {
  return {
    getLoggers: function () {
      return loggers;
    },
    info: function (message) {
      loggers.forEach(function (logger) { return logger.info(message); });
    },
    error: function (errorObject) {
      loggers.forEach(function (logger) { return logger.error(errorObject); });
    },
    warn: function (message) {
      loggers.forEach(function (logger) { return logger.warn(message); });
    },
    debug: function (message) {
      loggers.forEach(function (logger) { return logger.debug(message); });
    }
  };
};
