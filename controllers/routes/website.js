var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    appDir = path.dirname(require.main.filename);

module.exports = function(app) {
    var server = app.drivers.express.server,
        mysql = app.drivers.mysql,
        security = app.controllers.security,
        analyze = app.controllers.analyze,
        templateModel = appDir+'/views/templates/model.ejs';

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
    .get('/logout', function(req, res) {
        req.session.destroy();
        return res.redirect('/login');
    })


    ////////////////////
    // Dynamic Routes //
    ////////////////////

    .post('/login', function(req, res) {
        security.auth(req.body.email, req.body.password, function(err, user) {
            if(err) {
                return res.status(403).redirect('/login');
            }
            req.session.user = user.id;
            req.session.token = user.token;
            return res.redirect('/audit');
        });
    })
    .get('/confirm', function(req, res) {
        var token = req.query.token;
        var tokenData = app.drivers.crypto.decrypt(token);
        var userCheck = new app.models.user(app, {
            email: tokenData.email
        });
        userCheck.get(function(err, rows) {
            var userData = rows[0];
            if(err) return res.redirect('/login?confirm=false');
            var userUpdate = new app.models.user(app, {
                id: userData.id,
                confirm: 1
            });
            userUpdate.update(function(err, rows) {
                if(err) return res.redirect('/login?confirm=false');

                token = app.drivers.crypto.encrypt({
                    id : userData.id,
                    email : userData.email
                });
                req.session.user = userData.id;
                req.session.token = token;
                return res.redirect('/dashboard?confirm=true');
            })

        });
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
        user.get(function(err, rows) {
            res.render(templateModel, {
                page: 'profile',
                pageTitle: 'Profile | MicroSeo',
                h2: 'Profile',
                logged: true,
                user: rows[0]
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
    .post('/audit/result', function(req, res) {
        if(!req.session.token || !req.session.user) {
            req.session.destroy();
            return res.redirect('/login');
        }
        var grant = security.grant(req.session.user, req.session.token);
        if(!grant) {
            req.session.destroy();
            return res.redirect('/login');
        }

        analyze.init(req.body.url, function(results) {
            return res.render(templateModel, {
                page: 'audit-result',
                pageTitle: 'Audit Result | MicroSeo',
                h2: 'Audit Result',
                logged: true,
                res: results
            });
        });
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
