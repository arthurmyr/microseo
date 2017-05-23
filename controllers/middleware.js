var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function(app) {
    var server = app.drivers.express.server;
     
    server.use('/', express.static(path.resolve('views/assets')));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(session({
        secret: 'test',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 60*60*24*31*1000
        } 
    }));
    server.set('view engine', 'ejs');
}