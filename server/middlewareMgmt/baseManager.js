/*
    Placeholder method to perform any configuration on middleware
    It reads the configuration from default.json config file
*/

var nconf = require('nconf');

var baseManager = {
    handle(app) {
        this.configureCommon(app);

        if(nconf.get('development')) {
            this.configureDevelopmentEnv(app);
        } else {
            this.configureProductionEnv(app);            
        }
    },

    configureCommon(/*app*/) {
/*		console.log('baseManager.configureCommon()');
		
		try {
		// Configure loggers
		var log4js = require('log4js');
		log4js.loadAppender('file');
		log4js.addAppender(log4js.appenders.file('logs/clientlogs.log'), 'clientlogs');
		log4js.addAppender(log4js.appenders.file('logs/serverlogs.log'), 'serverlogs');
		
		var serverLogger = log4js.getLogger('serverlogs');
		serverLogger.debug('Server Logger initialized');
		
		var clientLogsLogger = log4js.getLogger('clientlogs');
		clientLogsLogger.debug('Client logger initialized');
		
		console.log('serverLogger: ' + serverLogger);
		console.log('clientLogsLogger: ' + clientLogsLogger);
		
		nconf.set('serverLogger', serverLogger);
		nconf.set('clientLogsLogger', clientLogsLogger);
		}
		catch(ex) {
			console.error(ex);
		}*/
	},

    configureProductionEnv(/*app*/) {},

    configureDevelopmentEnv(/*app*/) {}    
};

module.exports = baseManager;
