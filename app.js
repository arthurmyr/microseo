app = {}

app.drivers = {}
app.drivers.express = require('./drivers/express');
app.drivers.express.init();
app.drivers.mysql = require('./drivers/mysql');

app.models = {}
app.models.user = require('./models/user');
app.models.audit = require('./models/audit');

app.controllers = {}
app.controllers.routes = require('./controllers/routes')(app);