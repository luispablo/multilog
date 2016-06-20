var test = require("tape");
var MultiLog = require("../index");
var ConsoleLogger = require("../lib/ConsoleLogger");

test("index - Create two loggers to console", function (assert) {
	var properties = [{name: "console"}, {name: "console"}];
	var log = MultiLog(properties);

	assert.equal(JSON.stringify(log.getLoggers()[0]), JSON.stringify(ConsoleLogger(console)), "First is a console logger");
	assert.equal(JSON.stringify(log.getLoggers()[1]), JSON.stringify(ConsoleLogger(console)), "Second is a console logger");
	assert.end();
});
