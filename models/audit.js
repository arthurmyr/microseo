
module.exports = function(app, data){
    var mysql = app.drivers.mysql;

    this.data = {};
    this.data.id = data.id || null;
    this.data.user_id = data.user_id || null;
    this.data.url = data.url || null;
    this.data.test_passed = data.test_passed || null;
    this.data.test_to_improve = data.test_to_improve || null;
    this.data.test_failed = data.test_failed || null;
    this.data.global_score = data.global_score || null;
    this.data.semantic_score = data.semantic_score || null;
    this.data.responsive_score = data.responsive_score || null;
    this.data.speed_score = data.speed_score || null;
    this.data.inlink_score = data.inlink_score || null;
    this.data.backlink_score = data.backlink_score || null;
    this.data.http_score = data.http_score || null;
    
    this.table = 'audits';

    
    this.create = function(cb) {
        
    }
    
    this.get = function(cb) {
        
    }
    
    this.update = function(cb) {
        
    }
    
    this.delete = function(cb) {
        
    }

    return this;
}