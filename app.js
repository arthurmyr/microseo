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
app.controllers.security = require('./controllers/security')(app);
app.controllers.crawler = require('./controllers/crawler')(app);

app.controllers.analysis = {};
app.controllers.analysis.backlink = require('./controllers/analysis/backlink')(app);
app.controllers.analysis.inlink = require('./controllers/analysis/inlink')(app);
app.controllers.analysis.http = require('./controllers/analysis/http')(app);
app.controllers.analysis.responsive = require('./controllers/analysis/responsive')(app);
app.controllers.analysis.semantic = require('./controllers/analysis/semantic')(app);
app.controllers.analysis.speed = require('./controllers/analysis/speed')(app);

app.controllers.middleware = require('./controllers/middleware')(app);

app.controllers.routes = {}
app.controllers.routes.website = require('./controllers/routes/website')(app);
app.controllers.routes.api = require('./controllers/routes/api')(app);
app.controllers.routes.error = require('./controllers/routes/error')(app);