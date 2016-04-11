const test = require("tape");
const MultiLogger = require("../lib/MultiLogger");

const MESSAGE = "test message";

const fakeLogger1 = {
	info (message) { this.lastMessage = message; },
	error (error) { this.info(error); }
};
const fakeLogger2 = {
	info (message) { this.lastMessage = message; },
	error (error) { this.info(error); }
};

const multilog = MultiLogger([fakeLogger1, fakeLogger2]);

test("info", assert => {
	multilog.info(MESSAGE);

	assert.equal(fakeLogger1.lastMessage, MESSAGE, "Info message to fake logger 1");
	assert.equal(fakeLogger2.lastMessage, MESSAGE, "Info message to fake logger 2");
	assert.end();
});

test("error", assert => {
	const error = {code: 5, error: MESSAGE};
	multilog.error(error);

	assert.deepEqual(fakeLogger1.lastMessage, error, "Error object on fake logger 1");
	assert.deepEqual(fakeLogger2.lastMessage, error, "Error object on fake logger 2");
	assert.end();
})
