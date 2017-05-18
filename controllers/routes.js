var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');


module.exports = function(app){
    var server = app.drivers.express.server,
        mysql = app.drivers.mysql;

    ////////////////
    // Middleware //
    ////////////////
     
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

    
    /////////////////
    // Site Routes //
    /////////////////
        
    server
    .get('/', function(req, res){
        res.render(path.resolve('views/templates/model.ejs'), {
            page: 'home'
        });
    })
    .get('/login', function(req, res) {
        res.render(path.resolve('views/templates/model.ejs'), {
           page: 'login' 
        });
    })
    .post('/login', function(req, res) {
        app.controllers.security.auth(req.body.email, req.body.password, function(check, user) {
            if(!check) {
                return res.status(403).redirect('/login?error=badpassword');
            }
            
            req.session.user = user.id;
            req.session.token = user.token;
            res.status(200).redirect('/dashboard');
        });
    })
    .post('/logout', function(req, res) {
        req.session.destroy();
        return res.redirect('/');
    })
    .get('/dashboard', function(req, res) {
        res.render(path.resolve('views/templates/model.ejs'), {
           page: 'dashboard'
        });
    })
    .get('/profile', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        var grant = app.controllers.security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        var user = new app.models.user(app, {
            id: req.session.user
        });
        user.read(function(err, rows) {
            res.render(path.resolve('views/templates/model.ejs'), {
                page: 'profile',
                user: rows
            });
        })
        
    });
  
    
    ////////////////
    // API Routes //
    ////////////////
    
    server
    .get('/api/user', function(req, res) {
        var user = new app.models.user(app, {
            id: req.query.id
        });
        user.read(function(err, rows, fields) {
            if(err) {
                return res.status(500).send({
                    status: 'Error',
                    error: err
                }); 
            }
            else if (!rows) {
                return res.status(404).send({
                    status: 'Error',
                    error: 'Not Found'
                });
            }
            res.status(200).send({
                status: 'Sucess',
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
                    status: 'Error',
                    error: err
                }); 
            }
            res.status(201).send({
                status: 'Sucess',
                message: 'Created'
            });
        });
    })
    .put('/api/user', function(req, res) {
        // Compose the data object and filter variables
        if(!req.body.id || req.body.length === 1) {
            return res.status(422).send({
                status: 'Error',
                error: 'Bad Request'
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
                    status: 'Error',
                    error: 'Bad Request'
                });
            }
        }
        // End //
        
        var user = new app.models.user(app, req.body);
        user.update(function(err, rows, fields) {
            if(err) {
                return res.status(500).send({
                    status: 'Error',
                    error: err
                });
            }
            res.status(200).send({
                status: 'Sucess',
                message: 'Updated'
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
                    status: 'Error',
                    error: err
                });
            }
            res.status(200).send({
                status: 'Sucess',
                message: 'Deleted'
            });
        });
    })
    .post('/api/login', function(req, res) {
        app.controllers.security.auth(req.body.email, req.body.password, function(check, user) {
            if(!check) {
                return res.status(403).send({
                    status: 'Error',
                    error: 'Bad Password'
                });
            }
            res.status(200).send({
                status: 'Sucess',
                user: user
            });
        });
        
    });

    
    //////////////////
    // Error Routes //
    //////////////////
    
    server
    .use(function(req, res){
        res.redirect('/');
    });
}