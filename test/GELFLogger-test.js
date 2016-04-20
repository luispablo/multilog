"use strict";

const test = require("tape");
const GELFLogger = require("../lib/GELFLogger");
const Level = require("../lib/Level");

const MESSAGE = "test message";

const gelflog = {
	lastMessage: "",
	setConfig (config) { this.config = config; },
	info (message) { this.lastMessage = message; },
	error (error) { this.info(error); },
	debug (message) { this.lastMessage = message; },
	warn (message) { this.lastMessage = message; }
};
const config = {param: "value"};
const level = Level();
const log = GELFLogger(gelflog, config, level.DEBUG);

test("GELFLogger - tell its level", assert => {
	assert.equal(log.level, level.DEBUG, "Its level is DEBUG");
	assert.end();
});

test("GELFLogger - uses the level", assert => {
	let levelLog = GELFLogger(gelflog, config, level.INFO);
	const one = "1";
	levelLog.debug(one);
	assert.ok(gelflog.lastMessage.indexOf(one) < 0, "Hasn't logged debug");
	levelLog = GELFLogger(gelflog, config, level.DEBUG);
	levelLog.debug(one);
	assert.ok(gelflog.lastMessage.indexOf(one) >= 0, "Has logged debug");
	assert.end();
});

test("GELFLogger - config", assert => {
	assert.equal(gelflog.config, config, "Set the npm module gelf-pro config");
	assert.end();
});

test("GELFLogger - debug works", assert => {
	log.debug(MESSAGE);
	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted debug message");
	assert.end();
});

test("GELFLogger - warn works", assert => {
	log.warn(MESSAGE);
	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted warn message");
	assert.end();
});

test("GELFLogger - info works", assert => {
	log.info(MESSAGE);

	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted info message");
	assert.end();
});

test("GELFLogger - error works", assert => {
	const error = {code: 5, message: MESSAGE};

	log.error(error);

	assert.deepEqual(gelflog.lastMessage, JSON.stringify(error), "The error object sent to Graylog");
	assert.end();
});
