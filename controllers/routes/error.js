module.exports = function(app) {
    var server = app.drivers.express.server;
    
    // 404
    server
    .use(function(req, res){
        res.redirect('/audit');
    });
}