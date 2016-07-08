//var log4js = require('log4js');

var InternalLogger = function() {
	this.log4js = {};
	this.appender = {};

	this.initialize = function() {
		if (log4javascript == undefined) {
			throw Error('log4javascript library is not included!');
		}

		this.log4js = log4javascript.getLogger();
		this.appender = new log4javascript.AjaxAppender('./Logger.js');
		this.appender.setLayout(new log4javascript.JsonLayout());
		this.appender.setBatchSize(5);

		this.log4js.addAppender( this.appender );
	};

	this.trace = function(message) {
		this.log4js.trace(message);
	};

	this.debug = function(message) {
		this.log4js.debug(message);
	};

	this.info = function(message) {
		this.log4js.info(message);
	};

	this.warn = function(message) {
		this.log4js.warn(message);
	};

	this.error = function(message) {
		this.log4js.error(message);
	};

	this.fatal = function(message){
		this.log4js.fatal(message);
	};
};

var Logger = new InternalLogger();
Logger.initialize();

module.exports = Logger;
