app = {}

app.drivers = {}
app.drivers.express = require('./drivers/express');
app.drivers.express.init();
app.drivers.mysql = require('./drivers/mysql');
app.drivers.crypto = require('./drivers/crypto');

app.models = {}
app.models.user = require('./models/user');
app.models.audit = require('./models/audit');

app.controllers = {}
app.controllers.routes = require('./controllers/routes')(app);
app.controllers.security = require('./controllers/security')(app);
app.controllers.analysis = {};
app.controllers.analysis.backlink = require('./controllers/analysis/backlink');
app.controllers.analysis.inlink = require('./controllers/analysis/inlink');
app.controllers.analysis.http = require('./controllers/analysis/http');
app.controllers.analysis.responsive = require('./controllers/analysis/responsive');
app.controllers.analysis.semantic = require('./controllers/analysis/semantic');
app.controllers.analysis.speed = require('./controllers/analysis/speed');