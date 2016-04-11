const test = require("tape");
const MultiLog = require("../index");
const ConsoleLogger = require("../lib/ConsoleLogger");

test("Create two loggers to console", assert => {
	const properties = [{name: "console"}, {name: "console"}];
	const log = MultiLog(properties);

	assert.equal(JSON.stringify(log.getLoggers()[0]), JSON.stringify(ConsoleLogger(console)), "First is a console logger");
	assert.equal(JSON.stringify(log.getLoggers()[1]), JSON.stringify(ConsoleLogger(console)), "Second is a console logger");	
	assert.end();
});
