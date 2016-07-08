var compression = require('compression');
var nconf = require('nconf');

var baseManager = require('./baseManager.js');

var middlewareManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        app.use(compression({threshold: nconf.get('compressionThreshold')}));

        // to allow caching in-browser (mostly for libs), but still not to cache dev. files
        app.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
           res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });

     }
});

module.exports = middlewareManager;
