const test = require("tape");
const Builder = require("../lib/Builder");
const ConsoleLogger = require("../lib/ConsoleLogger");
const GELFLogger = require("../lib/GELFLogger");
const gelfPro = require("gelf-pro");
const level = require("../lib/Level")();

test("Builder - build console logger", assert => {
	const consoleLogger = Builder({name: "console", level: level.DEBUG});
	assert.equal(consoleLogger.level, level.DEBUG, "Its level is DEBUG");
	assert.equal(JSON.stringify(consoleLogger), JSON.stringify(ConsoleLogger(console, level.DEBUG)), "A console logger instance");
	assert.end();
});

test("Builder - build GELF logger", assert => {
	const props = {a: 3};
	const gelfLogger = Builder({name: "gelf", level: level.INFO, config: props});
	assert.equal(gelfLogger.level, level.INFO, "Its level is INFO");
	assert.equal(JSON.stringify(gelfLogger), JSON.stringify(GELFLogger(gelfPro, props, level.INFO)), "A GELF logger instance");
	assert.end();
});
