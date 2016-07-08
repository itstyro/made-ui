 var Logger = require('./Logger.js');

 window.addEventListener('error', function (e) {
     var stack = e.error.stack;
     var message = e.error.toString();
     if (stack) {
         message += '\n' + stack;
     }

 	Logger.error('Unhandled Exception: ' + message);
 });
