var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');


module.exports = function(app){
  var server = app.drivers.express.server,
  mysql = app.drivers.mysql;

  server.use('/', express.static(path.resolve('views/assets')));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: false
  }));
  server.set('view engine', 'ejs');

  // Site Routes
  server
  .get('/', function(req, res){
    res.render(path.resolve('views/templates/model.ejs'), {
      page: 'home'
    });
  });
  


//  // API Routes
//  server
//  .get('/api/electors', function(req, res){
//    if(req.query.id === undefined){
//      var elector = new app.models.elector(app, {});
//      elector.getAll(function(err, rows, fields){
//        if(err) res.status(500).send(err);
//        res.status(200).send({data: rows, status:'sucess'});
//      });
//    }
//    else{
//      var elector = new app.models.elector(app, {id: req.query.id});
//      elector.get(function(err, rows, fields){
//        if(err) res.status(500).send(err);
//        res.status(200).send({data: rows, status:'sucess'});
//      });
//    }
//  })
//  .post('/api/electors', function(req, res){
//    var elector = new app.models.elector(app, {
//      id : req.body.id,
//      email: req.body.email,
//      firstname: req.body.firstname,
//      lastname: req.body.lastname,
//      age: req.body.age,
//      adress: req.body.adress,
//      ip: req.connection.remoteAddress
//    });
//    elector.create(function(err, rows, fields){
//      if(err) res.status(500).send(err);
//      res.status(201).send({status:'sucess'});
//    });
//  })


  // Error Routes
  server
  .use(function(req, res){
    res.redirect('/');
  });
}