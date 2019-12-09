"use strict";

var test = require("tape");
var ConsoleLogger = require("../lib/ConsoleLogger");
var level = require("../lib/Level")();

var console = {
  lastMessage: "",
  log: function (message) {
    this.lastMessage = message;
  }
};
var log = ConsoleLogger(console, level.DEBUG);
var MESSAGE = "test message";

test("ConsoleLogger - tell its level", function (assert) {
  assert.equal(log.level, level.DEBUG, "It's level is DEBUG");
  assert.end();
});

test("ConsoleLogger - uses the level", function (assert) {
  var one = "1";
  var levelLog = ConsoleLogger(console, "ERROR");
  levelLog.warn(one);
  assert.ok(console.lastMessage.indexOf(one) < 0, "Mustn't have logged yet");
  levelLog = ConsoleLogger(console, "WARN");
  levelLog.warn(one);
  assert.ok(console.lastMessage.indexOf(one) >= 0, "Now it must have logged");
  assert.end();
});

test("ConsoleLogger - info works", function (assert) {
  log.info(MESSAGE);
  assert.equal(console.lastMessage, "INFO: "+ MESSAGE, "Formatted info level message");
  assert.end();
});

test("ConsoleLogger - warn works", function (assert) {
  log.warn(MESSAGE);
  assert.equal(console.lastMessage, "WARN: "+ MESSAGE, "Formatted warning message");
  assert.end();
});

test("ConsoleLogger - debug works", function (assert) {
  log.debug(MESSAGE);
  assert.equal(console.lastMessage, "DEBUG: "+ MESSAGE, "Formatted debug message");
  assert.end();
});

test("ConsoleLogger - error works", function (assert) {
  log.error({code: 5, message: MESSAGE});

  var expectedMessage = "ERROR: {\"code\":5,\"message\":\""+ MESSAGE +"\"}";

  assert.equal(console.lastMessage, expectedMessage, "Formatted error level message");
  assert.end();
});
