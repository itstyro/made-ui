var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/serverlogs.log'), 'serverlogs');

var logger = log4js.getLogger('serverlogs');
logger.setLevel(log4js.levels.ALL);
logger.debug('Logger initialized');

module.export = logger;