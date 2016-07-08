var env = require('./../../env.json');

var buildConfig = function() {
  console.log("*********"+process.env.NODE_ENV);
var node_env = process.env.NODE_ENV || 'development';
return env[node_env];
};

exports.config = buildConfig();
