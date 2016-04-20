"use strict";

const test = require("tape");
const ConsoleLogger = require("../lib/ConsoleLogger");
const level = require("../lib/Level")();

const console = {
	lastMessage: "",
	log (message) {
		this.lastMessage = message;
	}
};
const log = ConsoleLogger(console, level.DEBUG);
const MESSAGE = "test message";

test("ConsoleLogger - tell its level", assert => {
	assert.equal(log.level, level.DEBUG, "It's level is DEBUG");
	assert.end();
});

test("ConsoleLogger - uses the level", assert => {
	const one = "1";
	let levelLog = ConsoleLogger(console, "ERROR");
	levelLog.warn(one);
	assert.ok(console.lastMessage.indexOf(one) < 0, "Mustn't have logged yet");
	levelLog = ConsoleLogger(console, "WARN");
	levelLog.warn(one);
	assert.ok(console.lastMessage.indexOf(one) >= 0, "Now it must have logged");
	assert.end();
});

test("ConsoleLogger - info works", assert => {
	log.info(MESSAGE);

	assert.equal(console.lastMessage, `INFO: ${MESSAGE}`, "Formatted info level message");
	assert.end();
});

test("ConsoleLogger - warn works", assert => {
	log.warn(MESSAGE);
	assert.equal(console.lastMessage, `WARN: ${MESSAGE}`, "Formatted warning message");
	assert.end();
});

test("ConsoleLogger - debug works", assert => {
	log.debug(MESSAGE);
	assert.equal(console.lastMessage, `DEBUG: ${MESSAGE}`, "Formatted debug message");
	assert.end();
});

test("ConsoleLogger - error works", assert => {
	log.error({code: 5, message: MESSAGE});

	const expectedMessage = `ERROR: {"code":5,"message":"${MESSAGE}"}`;

	assert.equal(console.lastMessage, expectedMessage, "Formatted error level message");
	assert.end();
});
