"use strict";

var test = require("tape");
var GELFLogger = require("../lib/GELFLogger");
var Level = require("../lib/Level");

var MESSAGE = "test message";

var gelflog = {
	lastMessage: "",
	setConfig: function (config) { this.config = config; },
	info: function (message) { this.lastMessage = message; },
	error: function (error) { this.info(error); },
	debug: function (message) { this.lastMessage = message; },
	warn: function (message) { this.lastMessage = message; }
};
var config = {param: "value"};
var level = Level();
var log = GELFLogger(gelflog, config, level.DEBUG);

test("GELFLogger - tell its level", function (assert) {
	assert.equal(log.level, level.DEBUG, "Its level is DEBUG");
	assert.end();
});

test("GELFLogger - uses the level", function (assert) {
	var levelLog = GELFLogger(gelflog, config, level.INFO);
	var one = "1";
	levelLog.debug(one);
	assert.ok(gelflog.lastMessage.indexOf(one) < 0, "Hasn't logged debug");
	levelLog = GELFLogger(gelflog, config, level.DEBUG);
	levelLog.debug(one);
	assert.ok(gelflog.lastMessage.indexOf(one) >= 0, "Has logged debug");
	assert.end();
});

test("GELFLogger - config", function (assert) {
	assert.equal(gelflog.config, config, "Set the npm module gelf-pro config");
	assert.end();
});

test("GELFLogger - debug works", function (assert) {
	log.debug(MESSAGE);
	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted debug message");
	assert.end();
});

test("GELFLogger - warn works", function (assert) {
	log.warn(MESSAGE);
	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted warn message");
	assert.end();
});

test("GELFLogger - info works", function (assert) {
	log.info(MESSAGE);

	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted info message");
	assert.end();
});

test("GELFLogger - error works", function (assert) {
	var error = {code: 5, message: MESSAGE};

	log.error(error);

	assert.deepEqual(gelflog.lastMessage, JSON.stringify(error), "The error object sent to Graylog");
	assert.end();
});
