module.exports = function (gelflog, config) {
	gelflog.setConfig(config);

	return {
		info (message) {
			gelflog.info(message);
		},
		error (error) {
			gelflog.error(JSON.stringify(error));
		}
	};
};
