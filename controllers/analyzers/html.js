module.exports = {
    info: {
        totalScore: 90,
        score: null,
        pageTitle: {
            score: 10,
            length: null,
            hasPageTitle: {
                val: null,
                mustBe: true,
                msg: 'Their is no page title.'
            },
            pageTitleTooLong: {
                val: null,
                mustBe: false,
                msg: 'Page title is too long.'
            },
        },
        metaDescription: {
            score: 10,
            length: null,
            hasMetaDescription: {
                val: null,
                mustBe: true,
                msg: 'Their is no meta description.'
            },
            metaDescriptionTooLong: {
                val: null,
                mustBe: false,
                msg: 'Meta description is too long.'
            }
        },
        altDescription: {},
        linkTitles: {},
        brokenLinks: {},
        titles: {},
        languageEncoding: {},
        w3cValidator: {}
    },
    init: function($) {
        this.info.score = 0;
        this.pageTitle($);
        this.metaDescription($);
        console.log(this.info.score);
        
    },
    pageTitle: function($) {
        var pageTitle = $("title").text();
        
        if(pageTitle.length > 60) 
            return false;
        else 
            this.info.score += this.info.pageTitle.score;
    },
    metaDescription: function($) {
        var metaDescription = $('meta[name="description"]').text();
        
        if(metaDescription > 160) 
            return false;
        else 
            return this.info.score += this.info.metaDescription.score;
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
//    score: function() {
//        
//    }
}