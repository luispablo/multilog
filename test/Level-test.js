const test = require("tape");
const Level = require("../lib/Level");

const level = Level();

test("Level - available levels", assert => {
	assert.equal(level.DEBUG, "DEBUG", "Has debug level");
	assert.equal(level.INFO, "INFO", "Has info level");
	assert.equal(level.WARN, "WARN", "Has warn level");
	assert.equal(level.ERROR, "ERROR", "Has error level");
	assert.end();
});

test("Level - levels comparison", assert => {
	assert.ok(level.of("INFO").isGreaterThan("DEBUG"), "Info level is greater than debug");
	assert.ok(level.of("WARN").isGreaterThan("INFO"), "Warn level is greater than info");
	assert.ok(level.of("ERROR").isGreaterThan("WARN"), "Error level is greater than warn");
	assert.end();
});
