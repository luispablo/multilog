const test = require("tape");
const Builder = require("../lib/Builder");
const ConsoleLogger = require("../lib/ConsoleLogger");
const GELFLogger = require("../lib/GELFLogger");
const gelfPro = require("gelf-pro");

test("Build console logger", assert => {
	const consoleLogger = Builder({name: "console"});

	assert.equal(JSON.stringify(consoleLogger), JSON.stringify(ConsoleLogger(console)), "A console logger instance");
	assert.end();
});

test("Build GELF logger", assert => {
	const props = {a: 3};
	const gelfLogger = Builder({name: "gelf", config: props});

	assert.equal(JSON.stringify(gelfLogger), JSON.stringify(GELFLogger(gelfPro, props)), "A GELF logger instance");
	assert.end();
});
