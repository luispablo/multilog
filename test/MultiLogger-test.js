var test = require("tape");
var MultiLogger = require("../lib/MultiLogger");

var MESSAGE = "test message";

var fakeLogger1 = {
	info: function (message) { this.lastMessage = message; },
	error: function (error) { this.info(error); },
	warn: function (message) { this.info(message); },
	debug: function (message) { this.info(message); }
};
var fakeLogger2 = {
	info: function (message) { this.lastMessage = message; },
	error: function (error) { this.info(error); },
	warn: function (message) { this.info(message); },
	debug: function (message) { this.info(message); }
};

var multilog = MultiLogger([fakeLogger1, fakeLogger2]);

test("MultiLogger - warn works", function (assert) {
	multilog.warn(MESSAGE);
	assert.equal(fakeLogger1.lastMessage, MESSAGE, "Warn message to fake logger 1");
	assert.equal(fakeLogger2.lastMessage, MESSAGE, "Warn message to fake logger 2");
	assert.end();
});

test("MultiLogger - debug works", function (assert) {
	multilog.debug(MESSAGE);
	assert.equal(fakeLogger1.lastMessage, MESSAGE, "Debug message to fake logger 1");
	assert.equal(fakeLogger2.lastMessage, MESSAGE, "Debug message to fake logger 2");
	assert.end();
});

test("MultiLogger - info works", function (assert) {
	multilog.info(MESSAGE);

	assert.equal(fakeLogger1.lastMessage, MESSAGE, "Info message to fake logger 1");
	assert.equal(fakeLogger2.lastMessage, MESSAGE, "Info message to fake logger 2");
	assert.end();
});

test("MultiLogger - error works", function (assert) {
	var error = {code: 5, error: MESSAGE};
	multilog.error(error);

	assert.deepEqual(fakeLogger1.lastMessage, error, "Error object on fake logger 1");
	assert.deepEqual(fakeLogger2.lastMessage, error, "Error object on fake logger 2");
	assert.end();
})
