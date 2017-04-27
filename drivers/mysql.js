var mysql = require('mysql'),
    dbName = 'microseo';

module.exports = {
  connection: function(){
    var db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'test',
      database: dbName
    });
    db.connect();
    return db;
  },
  query: function(q, cb){
    var db = this.connection();
    db.query(q, function(err, rows, fields){
      cb(err, rows, fields);
    });
    db.end();
  }
}