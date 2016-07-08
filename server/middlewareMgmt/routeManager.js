var FS = require('fs');
var express = require('express');
var path = require('path');
var nconf = require('nconf');
var https = require('https');
var http = require('http');
var request = require('request');
var cors = require('cors');
var baseManager = require('./baseManager.js');
var apiOperationsRouter =  require('./apiOperations.js');
var routeManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        var apiRouter = this.createApiRouter();
        var pagesRouter = this.createPageRouter();
        var logRouter = this.createLogRouter(app);

        app.use('/api', apiRouter);
        app.use('/', pagesRouter);
		    app.use('/logger', logRouter);
        //app.use(cors());
    },

    createPageRouter() {
        var router = express.Router();
        router.get('*', (req, res) => {
            /* TODO :Do a route match here and respond with appropriate markup*/
          var url = 'http://va10n40504.anthem.com:81/cs/Satellite?d=Universal&pagename=brkSecure%2FMADE%2FPortal%2FLayout';
           request(url, function (error, response, body) {
            // console.log("**"+body);
              if (!error && response.statusCode == 200) {
                  res.send(body);
              }else{
                  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
              }
            });
        });
        return router;
    },

    createApiRouter(app) {
        return apiOperationsRouter;
    },

	   createLogRouter(app) {
        var router = express.Router();
        this.logRouter(router, app);
        return router;
    },

    logRouter(router, app) {
		var bodyParser = require('body-parser');
		var multer = require('multer');
/*
		var serverLogger = require('../ServerLogger');

		console.log(serverLogger);
		console.log(JSON.stringify(serverLogger));*/

		//************* EXPORTED LOGGER IS NOT WORKING. NEED TO CHECK, UNTIL THEN WE NEED THE CODE BELOW
		var log4js = require('log4js');
		log4js.loadAppender('file');
		log4js.addAppender(log4js.appenders.file('logs/clientlogs.log'), 'clientlogs');

		var serverLogger = log4js.getLogger('clientlogs');
		serverLogger.setLevel(log4js.levels.ALL);

		var upload = multer();

		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());

		return router.post('/', upload.array(), (req, res) => {
			var logJsons = JSON.parse(req.body.data);

			console.log(logJsons);
			for(var i=0; i<logJsons.length; i++) {
				var aLog = logJsons[i];
				console.log(aLog);
				switch(aLog.level) {
					case "DEBUG":
						serverLogger.debug(aLog);
						break;
					case 'INFO':
						serverLogger.info(aLog);
						break;
					case 'TRACE':
						serverLogger.trace(aLog);
						break;
					case 'ERROR':
						serverLogger.error(aLog);
						break;
					case 'FATAL':
						serverLogger.fatal(aLog);
						break;
					case 'WARN':
						serverLogger.warn(aLog);
						break;
				}
			};

			res.sendStatus(200);
		});
	},

});

module.exports = routeManager;
