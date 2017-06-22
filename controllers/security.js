var bcrypt = require('bcryptjs');

module.exports = function(app) {
    return {
        hash: function(data) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data, salt);
            return hash;
        },
        auth: function(email, password, cb) {
            var q = "SELECT id, email, password, confirm FROM users WHERE email='"+ email+"' LIMIT 1";
            app.drivers.mysql.query(q, function(err, rows, fields) {
                if(rows.length === 0) return cb('no account', null);
                
                var userData = rows[0],
                check = bcrypt.compareSync(password, userData.password);
                
                if(!check) return cb('bad password', null);
                else if(userData.confirm === 0) return cb('inactive account', null);

                var user = new app.models.user(app, {
                  id: userData.id
                });
                user.get(function(err, rows, fields) {
                    userData.token = app.drivers.crypto.encrypt({
                        id : userData.id,
                        email : userData.email
                    });
                    cb(null, userData);
                });		
            });
        },
        grant : function(id, token){
            var data = app.drivers.crypto.decrypt(token);
            return data.id == id
        }
    }
}