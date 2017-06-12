var microseo = microseo || {};

$(function(){
    
    microseo.ui = {};

    microseo.ui.form = function() {
        
        // Styling forms
        $('form > div input').focus(function(e){
            $(this).parent().css('border-color','#00ADEF'); // blue border
        });
        $('form > div input').blur(function(e){
            $(this).parent().css('border-color','#DBDBDB'); // grey border
        });
        
        // Filter value
        $('form').submit(function(e){
            var data = $(this).serializeArray();
            
            for(var i = 0; i<data.length; i++) {
                if(data[i].value.trim().length === 0) {
                    e.preventDefault();
                }
                if(data[i].name === "confirm" && data[i].value !== data[i-1].value) {
                    e.preventDefault();
                }
            }
        });
    }
    
    microseo.ui.footer = function() {
        var windowHeight = $(window).outerHeight();
        var headerHeight = $('body > header').outerHeight();
        var footerHeight = $('body > footer').outerHeight();
        var contentHeight = $('body > main').outerHeight();
        
        if(contentHeight < (windowHeight - headerHeight - footerHeight)) {
            console.log(true);
            $('body > footer').css('position', 'absolute')
                              .css('bottom', '0px');
        }

        $(window).resize(function(){
            microseo.ui.footer();
        })
    }
});