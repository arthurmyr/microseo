
module.exports = function(app, data){
    var mysql = app.drivers.mysql;

    this.id = data.id || null;
    this.table = 'users';

    
    this.create = function(cb) {
        
    }
    
    this.read = function(cb) {
        if(this.id === null) {
            var query = 'SELECT * FROM '+this.table;
        }
        else if(typeof this.id === 'number' && this.id >= 0) {    
            var query = 'SELECT * FROM '+this.table+' WHERE id='+this.id;
        }
        else return false
        
        mysql.query(query, function(err, rows, fields){
            cb(err, rows, fields);
        });
    }
    
    this.update = function(cb) {
        
    }
    
    this.delete = function(cb) {
        
    }

    return this;
}
