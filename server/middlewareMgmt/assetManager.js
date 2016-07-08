/*
    Placeholder to setup assets and static folder for express
*/

var PATH = require('path');

var express = require('express');
var nconf = require('nconf');
//var path = require('path');

var baseManager = require('./baseManager.js');

const ROOT = './../../';

var assetsManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        var staticFolders = nconf.get('staticFolders');
        //var adjustedFolders = this.adjustStaticFolders(staticFolders, app.get('root'));
        console.log("*******"+PATH.join(__dirname + '/../../dist'));
        //express.static(__dirname + '/../../dist')
        app.use(express.static(PATH.join(__dirname + '/../../dist')));

        /*adjustedFolders.forEach(function(folder) {
            app.use(nconf.get('staticFolderMount'), express.static(folder));
            console.log('++++++',folder);
        });  */
    },
    adjustStaticFolders(folders, root) {
        const adjustedFolders = folders.map(function(folder) {
            return PATH.resolve(__dirname, ROOT, folder);
        });
        return adjustedFolders;
    }
});

module.exports = assetsManager;
