module.exports = function () {

  var DEBUG = "DEBUG";
  var INFO = "INFO";
  var WARN = "WARN";
  var ERROR = "ERROR";

  var levels = [DEBUG, INFO, WARN, ERROR];

  return {
    DEBUG: DEBUG, INFO: INFO, WARN: WARN, ERROR: ERROR,
    of: function (level) {
      this.level = level;
      return this;
    },
    isGreaterThan: function (otherLevel) {
      return levels.indexOf(this.level) > levels.indexOf(otherLevel);
    }
  };
};
