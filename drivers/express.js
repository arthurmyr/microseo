var express = require('express'),
    appPort = 1314;

module.exports = {
  server: null,
  init: function(){
    var app = express();
    app.listen(appPort, function(){
      console.log('listening on *'+appPort);
    });
    this.server = app;
  }
}
