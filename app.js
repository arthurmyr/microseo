app = {}

/////////////
// DRIVERS //
/////////////

app.drivers = {}
app.drivers.express = require('./drivers/express');
app.drivers.express.init();
app.drivers.mysql = require('./drivers/mysql');
app.drivers.crypto = require('./drivers/crypto');

////////////
// MODELS //
////////////

app.models = {}
app.models.user = require('./models/user');
app.models.audit = require('./models/audit');

/////////////////
// CONTROLLERS //
/////////////////

app.controllers = {}
app.controllers.tools = require('./controllers/tools');
app.controllers.security = require('./controllers/security')(app);
app.controllers.mailer = require('./controllers/mailer')();
app.controllers.crawler = require('./controllers/crawler');

app.controllers.analyzers = {};
app.controllers.analyzers.html = require('./controllers/analyzers/html');
app.controllers.analyzers.responsive = require('./controllers/analyzers/responsive');
app.controllers.analyzers.speed = require('./controllers/analyzers/speed');
app.controllers.analyzers.http = require('./controllers/analyzers/http');
app.controllers.analyze = require('./controllers/analyze')(app);

app.controllers.middleware = require('./controllers/middleware')(app);

app.controllers.routes = {}
app.controllers.routes.website = require('./controllers/routes/website')(app);
app.controllers.routes.api = require('./controllers/routes/api')(app);
app.controllers.routes.error = require('./controllers/routes/error')(app);