module.exports = {
    getTimestamp: function() {
        var timestamp = Math.floor(Date.now() / 1000);
        return timestamp;
    },
    getDateTime: function() {
        var d = new Date();
        var year = d.getUTCFullYear();
        var month = ('0'+d.getUTCMonth()).slice(-2);
        var date = ('0'+d.getUTCDate()).slice(-2);
        var hours = ('0'+d.getUTCHours()).slice(-2);
        var minutes = ('0'+d.getUTCMinutes()).slice(-2);
        var seconds = ('0'+d.getUTCSeconds()).slice(-2);
        
        var dateTime = year +'-'+ month +'-'+ date +' '+ hours +':'+ minutes +':'+ seconds;
        return dateTime;
    }
}