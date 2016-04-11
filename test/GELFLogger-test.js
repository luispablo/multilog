const test = require("tape");
const GELFLogger = require("../lib/GELFLogger");

const MESSAGE = "test message";

const gelflog = {
	setConfig (config) {
		this.config = config;
	},
	info (message) {
		this.lastMessage = message;
	},
	error (error) {
		this.info(error);
	}
};
const config = {param: "value"};
const log = GELFLogger(gelflog, config);

test("config", assert => {
	assert.equal(gelflog.config, config, "Set the npm module gelf-pro config");
	assert.end();
});

test("info", assert => {
	log.info(MESSAGE);

	assert.equal(gelflog.lastMessage, MESSAGE, "Formatted info message");
	assert.end();
});

test("error", assert => {
	const error = {code: 5, message: MESSAGE};

	log.error(error);

	assert.deepEqual(gelflog.lastMessage, JSON.stringify(error), "The error object sent to Graylog");
	assert.end();
});
