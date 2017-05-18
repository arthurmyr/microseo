var crypto = require('crypto-js'),
    secretKey = 'test';

module.exports = {
    encrypt: function(data) {
        data = typeof data === 'object' ? JSON.stringify(data) : data
        
        var ciphertext = crypto.AES.encrypt(data, secretKey);
        return ciphertext.toString();
    },
    
    decrypt: function(data) {
        var bytes  = crypto.AES.decrypt(data, secretKey),
            plaintext = bytes.toString(crypto.enc.Utf8),
            final;
        
        if(plaintext.charAt(0) == '{' || plaintext.charAt(0) == '['){
            final = JSON.parse(plaintext)
        } 
        else {
            final = plaintext
        }
        
        return final
    }
}