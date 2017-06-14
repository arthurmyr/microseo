var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function(app) {
    var server = app.drivers.express.server,
        mysql = app.drivers.mysql,
        templateModel = path.resolve('views/templates/model.ejs'),
        crawler = app.controllers.crawler;
    
    server
    .get('/api/user', function(req, res) {
        var user = new app.models.user(app, {
            id: req.query.id
        });
        user.read(function(err, rows, fields) {
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    error: err
                }); 
            }
            else if (!rows) {
                return res.status(404).send({
                    status: 'error',
                    error: 'not found'
                });
            }
            res.status(200).send({
                status: 'sucess',
                data: rows[0]
            });
        });
    })
    .post('/api/user', function(req, res) {
        var user = new app.models.user(app, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: app.controllers.security.hash(req.body.password)
        });
        user.create(function(err, rows, fields) {
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    error: err,
                    message: "The account can't be created for an unknown reason."
                }); 
            }
            res.status(201).send({
                status: 'success',
                message: 'Your account has been created.'
            });
        });
    })
    .put('/api/user', function(req, res) {
        // Compose the data object and filter variables
        if(!req.body.id || req.body.length === 1) {
            return res.status(422).send({
                status: 'error',
                error: 'bad request'
            });
        }
        for (prop in req.body) {
            if (prop !== 'id'
             && prop !== 'firstname'
             && prop !== 'lastname'
             && prop !== 'email'
             && prop !== 'password'
             && prop !== 'subscription'
             && prop !== 'dob'
             && prop !== 'country'
             && prop !== 'city'
             && prop !== 'zip'
             && prop !== 'adress'
             && prop !== 'additional_adress') {
                return res.status(422).send({
                    status: 'error',
                    error: 'bad request'
                });
            }
        }
        // End //
        
        var user = new app.models.user(app, req.body);
        user.update(function(err, rows, fields) {
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    error: err
                });
            }
            res.status(200).send({
                status: 'sucess',
                message: 'updated'
            });
        });
    })
    .delete('/api/user', function(req, res) {
        var user = new app.models.user(app, {
           id: req.body.id 
        });
        user.delete(function(err, rows, fields) {
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    error: err
                });
            }
            res.status(200).send({
                status: 'sucess',
                message: 'deleted'
            });
        });
    })
    .post('/api/user/login', function(req, res) {
        app.controllers.security.auth(req.body.email, req.body.password, function(check, user) {
            if(!check) {
                return res.status(403).send({
                    status: 'error',
                    error: 'bad password'
                });
            }
            res.status(200).send({
                status: 'sucess',
                user: user
            });
        });
    })
    .get('/api/audit', function(req, res) {
        
    })
    .post('/api/audit', function(req, res) {
        
    })
    .put('/api/audit', function(req, res) {
        
    })
    .delete('/api/audit', function(req, res) {
        
    })
    .get('/api/service/analyze', function(req, res) {
        
    })
    .post('/api/service/sendmail', function(req, res) {
        var html = app.controllers.mailer.generateTemplate({
            title: 'Client message',
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            message: req.body.message
        });
        var mailOptions = {
            to: 'microseo.staff@gmail.com',
            subject: 'Client message',
            html: html,
            text: ''
        }
        app.controllers.mailer.send(mailOptions, function(err, info) {
            if(err) res.status(500).send({
                status: 'error',
                error: err,
                message: 'An error occured during the process... We are sorry for this trouble.'
            });
            res.status(200).send({
                status: 'success',
                message: 'Mail Sended. We will reply as soon as possible.'
            });
        });
    })
}