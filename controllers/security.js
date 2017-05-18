var bcrypt = require('bcryptjs');

module.exports = function(app) {
    return {
        hash: function(data) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data, salt);
            return hash;
        },
        auth: function(email, password, cb) {
            var q = "SELECT id, email, password FROM users WHERE email='"+ email+"'";
            app.drivers.mysql.query(q, function(err, rows, fields) {
                var userData = rows[0],
                check = bcrypt.compareSync(password, userData.password);
                
                if(!check)
                    return cb(check, null)

                var user = new app.models.user(app, {
                  id: userData.id
                });
                user.read(function(err, rows, fields) {
                    rows.token = app.drivers.crypto.encrypt({
                        id : userData.id,
                        email : userData.email
                    });
                    
                    cb(check, rows);
                });		
            });
        },
        grant : function(id, token){
            var data = app.drivers.crypto.decrypt(token);
            return data.id == id
        }
    }
}