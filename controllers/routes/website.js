var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function(app) {
    var server = app.drivers.express.server,
        mysql = app.drivers.mysql,
        templateModel = path.resolve('views/templates/model.ejs');
    
    ///////////////////
    // Static Routes //
    ///////////////////
    
    server
    .get('/', function(req, res){
        res.render(templateModel, {
            page: 'home'
        });
    })
    .get('/features', function(req, res) {
        res.render(templateModel, {
           page: 'features'
        });
    })
    .get('/pricing', function(req, res) {
        res.render(templateModel, {
           page: 'pricing'
        });
    })
    .get('/about', function(req, res) {
        res.render(templateModel, {
           page: 'about'
        });
    })
    .get('/contact', function(req, res) {
        res.render(templateModel, {
           page: 'contact'
        });
    })
    .get('/signup', function(req, res) {
        res.render(templateModel, {
           page: 'signup'
        });
    })
    .post('/signup', function(req, res) {
        
    })
    .get('/login', function(req, res) {
        res.render(templateModel, {
           page: 'login'
        });
    })
    
    
    ////////////////////
    // Dynamic Routes //
    ////////////////////
    
    .post('/login', function(req, res) {
        app.controllers.security.auth(req.body.email, req.body.password, function(check, user) {
            if(!check) {
                return res.status(403).redirect('/login?error=badpassword');
            }
            
            req.session.user = user.id;
            req.session.token = user.token;
            res.redirect('/dashboard');
        });
    })
    .post('/logout', function(req, res) {
        req.session.destroy();
        return res.redirect('/');
    })
    .get('/dashboard', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = app.controllers.security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
           page: 'dashboard'
        });
    })
    .get('/audit', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = app.controllers.security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
           page: 'audit'
        });
    })
    .get('/competition', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = app.controllers.security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
           page: 'competition'
        });
    })
    .get('/history', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = app.controllers.security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
           page: 'history'
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
            res.render(templateModel, {
                page: 'profile',
                user: rows
            });
        }) 
    });
}