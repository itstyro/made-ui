var express = require('express');
var nconf = require('nconf');

var configManager = require('./middlewareMgmt/configManager.js');
var middlewareManager = require('./middlewareMgmt/middlewareManager.js');
var routeManager = require('./middlewareMgmt/routeManager.js');
var assetsManager = require('./middlewareMgmt/assetManager.js');

var app = express();

configManager.handle(app);
middlewareManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app);

app.listen(nconf.get('port'), function(){
	console.log('Starting Server ...')
    console.log('Listening on http://' + nconf.get('host') + ':' + nconf.get('port'));
});
