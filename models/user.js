
module.exports = function(app, data){
    var mysql = app.drivers.mysql,
        tools = app.controllers.tools;
    
    this.data = {};
    this.data.id = data.id || null;
    this.data.firstname = data.firstname || null;
    this.data.lastname = data.lastname || null;
    this.data.email = data.email || null;
    this.data.password = data.password || null;
    this.data.subscription = data.subscription || null;
    this.data.dob = data.dob || null;
    this.data.country = data.country || null;
    this.data.city = data.city || null;
    this.data.zip = data.zip || null;
    this.data.adress = data.adress || null;
    this.data.additional_adress = data.additional_adress || null;
    this.data.created_at = data.created_at || null;
    this.data.updated_at = data.updated_at || null;
    
    this.table = 'users';

    
    this.create = function(cb) {
        var datetime = tools.getDateTime();
        var values = "VALUES ('" + 
            this.data.firstname + "','" + 
            this.data.lastname + "','" + 
            this.data.email + "','" + 
            this.data.password + "','" + 
            datetime + "','" + 
            datetime + "')";
        
        var q = "INSERT INTO " + this.table + " (firstname, lastname, email, password, created_at, updated_at) " + values;
        
        mysql.query(q, function(err, rows, fields) {
            cb(err, rows, fields);
        })
    }
    
    this.read = function(cb) {
        var q = 'SELECT * FROM '+ this.table +' WHERE id='+ this.data.id;
        mysql.query(q, function(err, rows, fields) {
            cb(err, rows[0], fields);
        });
    }
    
    this.update = function(cb) {        
        var q = "UPDATE "+ this.table +" SET ";
        var propsNb = Object.keys(data).length;
        for (prop in data) {
            if (prop !== 'id') {
                q += prop + "='" + data[prop] + "', ";
            }
        }
        q += "updated_at='"+ tools.getDateTime() +"' WHERE id='"+ data.id +"'";
        console.log(tools.getDateTime());
        mysql.query(q, function(err, rows, fields) {
            cb(err, rows, fields);
        });
    }
    
    this.delete = function(cb) {
        var q = "DELETE FROM "+ this.table +" WHERE id="+ this.data.id;
        mysql.query(q, function(err, rows, fields) {
            cb(err, rows, fields);
        })
    }

    return this;
}
