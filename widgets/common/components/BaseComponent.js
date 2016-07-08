 var Logger = require('./Logger.js');
 var React = require('react');

 var BaseComponent = Object.assign({}, Logger);

 BaseComponent.__proto__.extend = function(subClass) {
 	var descriptors = Object.keys(subClass).reduce(function(descriptors, key) {
 		descriptors[key] = Object.getOwnPropertyDescriptor(subClass, key);
 		return descriptors;
     }, {});

 	 // by default, Object.assign copies enumerable Symbols too
     Object.getOwnPropertySymbols(subClass).forEach(function (sym) {
       var descriptor = Object.getOwnPropertyDescriptor(subClass, sym);
       if (descriptor.enumerable) {
         descriptors[sym] = descriptor;
       }
     });

     Object.defineProperties(this, descriptors);
 };

 module.exports = BaseComponent;
