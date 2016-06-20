var test = require("tape");
var Builder = require("../lib/Builder");
var ConsoleLogger = require("../lib/ConsoleLogger");
var GELFLogger = require("../lib/GELFLogger");
var gelfPro = require("gelf-pro");
var level = require("../lib/Level")();

test("Builder - build console logger", function (assert) {
	var consoleLogger = Builder({name: "console", level: level.DEBUG});
	assert.equal(consoleLogger.level, level.DEBUG, "Its level is DEBUG");
	assert.equal(JSON.stringify(consoleLogger), JSON.stringify(ConsoleLogger(console, level.DEBUG)), "A console logger instance");
	assert.end();
});

test("Builder - build GELF logger", function (assert) {
	var props = {a: 3};
	var gelfLogger = Builder({name: "gelf", level: level.INFO, config: props});
	assert.equal(gelfLogger.level, level.INFO, "Its level is INFO");
	assert.equal(JSON.stringify(gelfLogger), JSON.stringify(GELFLogger(gelfPro, props, level.INFO)), "A GELF logger instance");
	assert.end();
});
