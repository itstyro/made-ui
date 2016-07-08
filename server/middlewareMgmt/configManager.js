/*Place holder for setting up middleware view engine and view directory configuration*/

var PATH = require('path');

var nconf = require('nconf');

var baseManager = require('./baseManager.js');

const ROOT = '../';

var defaultConfig;
var environment = nconf.argv().get("environment");
if(environment === undefined){
  defaultConfig  = PATH.resolve(__dirname, ROOT, 'config/urlConfig_DEV.json');
}else{
  environment = environment.toUpperCase();
  defaultConfig = PATH.resolve(__dirname, ROOT, 'config/urlConfig_'+environment+'.json');
}

if(defaultConfig === undefined){
  defaultConfig  = PATH.resolve(__dirname, ROOT, 'config/urlConfig_DEV.json');
}


nconf.argv().env().file({file: defaultConfig}).defaults({ENV: 'development'});

var configManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {

        app.set('x-powered-by', false); /*remove this header so that framework information is not leaked out
                                         Any other necessary headers need to be set here */

        /*set up app view engine configuration here*/

       // app.set('view engine', 'hbs'/'jade'/'ejs');
    }
});

module.exports = configManager;
