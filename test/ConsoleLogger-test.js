const test = require("tape");
const ConsoleLogger = require("../lib/ConsoleLogger");

const console = {
	lastMessage: "",
	log (message) {
		this.lastMessage = message;
	}
};
const log = ConsoleLogger(console);
const MESSAGE = "test message";

test("info", assert => {
	log.info(MESSAGE);

	assert.equal(console.lastMessage, `INFO: ${MESSAGE}`, "Formatted info level message");
	assert.end();
});

test("error", assert => {
	log.error({code: 5, message: MESSAGE});

	const expectedMessage = `\x1b[31m\x1b[1mERROR:\x1b[22m\x1b[39m \x1b[31m${MESSAGE}\x1b[39m`;

	assert.equal(console.lastMessage, expectedMessage, "Formatted error level message");
	assert.end();
});
