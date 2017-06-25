module.exports = {
    init: function($) {
        this.points = 0;
        this.results = {
            score: 0,
            successes: 0,
            errors: 0,
            warnings: 0,
            pageTitle: {
                error: null,
                warning: null,
                length: null
            },
            metaDescription: {
                error: null,
                warning: null,
                length: null
            }
        };
        
        this.pageTitle($);
        this.metaDescription($);
        this.setScore();
        return this.results;
    },
    pageTitle: function($) {
        if(!$('title').length) {
            this.results.errors++;
            return this.results.pageTitle.error = 'Their is no page title.';
        }
        
            
        var pageTitle = $("title").text();
        this.results.pageTitle.length = pageTitle.length;
        
        if(pageTitle.length === 0) {
            this.results.warnings++;
            return this.results.pageTitle.warning = 'Page title is empty.';
        }
        
        if(pageTitle.length > 60) {
            this.results.warnings++;
            return this.results.pageTitle.warning = 'Page title is too long.';
        }
        
        else {
            this.results.successes++;
            this.points += 10;
        }
    },
    metaDescription: function($) {
        if(!$('meta[name="description"]').length) {
            this.results.errors++;
            return this.results.metaDescription.error = 'Their is no meta description.';
        }
            
        var metaDescription = $('meta[name="description"]').text();
        this.results.metaDescription.length = metaDescription.length;
        
        if(metaDescription.length === 0) {
            this.results.warnings++;
            return this.results.metaDescription.warning = 'Meta description is empty.';
        }
        
        if(metaDescription.length > 160) {
            this.results.warnings++;
            return this.results.metaDescription.warning = 'Meta description is too long.';
        }
        
        else {
            this.results.successes++;
            this.points += 10;
        }
    },
    altDescription: function($) {
        
    },
    linkTitles: function($) {
        
    },
    brokenLinks: function($) {
        
    },
    titles: function($) {
        
    },
    languageEncoding: function($) {
        
    },
    w3cValidator: function($) {
        
    },
    setScore: function() {
        var maxPoints = 20;
        this.results.score = Math.round((this.points / maxPoints) * 100);
    }
}