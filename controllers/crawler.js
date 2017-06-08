var request = require('request'),
    cheerio = require('cheerio');

module.exports = {
    checkUrl: function(url, cb) {
        request(url, function(err, res, body) {
            var valid = 1;

            if(err.code === 'ENOTFOUND')
                 valid = 0;

            cb(valid);
        });
    },
    getDom: function(url, cb) {
        request(url, function(err, res, body) {
            if(err)
                return console.error(err, res, body);


            var $ = cheerio.load(body);
            cb($);
        });
    },
    getStatus: function(url, cb) {
        var status = request(url, function(err, res, body) {
            if(err)
                return console.error(err, res, body);

            cb(res.statusCode);
        });
    },
    getHeaders: function(url, cb) {
        request(url, function(err, res, body) {
            if(err)
                return console.error(err, res, body);

            cb(res.headers);
        });
    }
}