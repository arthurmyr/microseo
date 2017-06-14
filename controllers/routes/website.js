var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function(app) {
    var server = app.drivers.express.server,
        mysql = app.drivers.mysql,
        security = app.controllers.security,
        analyze = app.controllers.analyze,
        templateModel = path.resolve('views/templates/model.ejs');
    
    ///////////////////
    // Static Routes //
    ///////////////////
    
    server
    .get('/', function(req, res){
        res.render(templateModel, {
            page: 'home',
            pageTitle: 'MicroSeo',
            logged: false
        });
    })
    .get('/features', function(req, res) {
        res.render(templateModel, {
            page: 'features',
            pageTitle: 'Features | MicroSeo',
            logged: false
        });
    })
    .get('/pricing', function(req, res) {
        res.render(templateModel, {
            page: 'pricing',
            pageTitle: 'Pricing | MicroSeo',
            logged: false
        });
    })
    .get('/contact', function(req, res) {
        res.render(templateModel, {
            page: 'contact',
            pageTitle: 'Contact | MicroSeo',
            logged: false
        });
    })
    .get('/signup', function(req, res) {
        res.render(templateModel, {
            page: 'signup',
            pageTitle: 'Signup | MicroSeo',
            logged: false
        });
    })
    .get('/login', function(req, res) {
        res.render(templateModel, {
            page: 'login',
            pageTitle: 'Login | MicroSeo',
            logged: false
        });
    })
    
    
    ////////////////////
    // Dynamic Routes //
    ////////////////////
    
    .post('/login', function(req, res) {
        security.auth(req.body.email, req.body.password, function(check, user) {
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
    .get('/profile', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        var grant = security.grant(req.session.user, req.session.token);
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
                pageTitle: 'Profile | MicroSeo',
                h2: 'Profile',
                logged: true,
                user: rows
            });
        }) 
    })
    .get('/dashboard', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
            page: 'dashboard',
            pageTitle: 'Dashboard | MicroSeo',
            h2: 'Dashboard',
            logged: true
        });
    })
    .get('/audit', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
            page: 'audit',
            pageTitle: 'Audit | MicroSeo',
            h2: 'Audit',
            logged: true
        });
    })
    .post('/audit', function(req, res) {
        //        analyze.init('https://fr.wikipedia.org');
        //        analyze.init('https://www.lequipe.fr/Football');
        analyze.init(req.url);
    })
    .get('/comparator', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
            page: 'comparator',
            pageTitle: 'Comparator | MicroSeo',
            h2: 'Comparator',
            logged: true
        });
    })
    .get('/history', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }
        
        res.render(templateModel, {
            page: 'history',
            pageTitle: 'History | MicroSeo',
            h2: 'History',
            logged: true
        });
    });
}