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
            var formData = $(this).serializeArray();
            
            for(var i = 0; i<formData.length; i++) {
                e.preventDefault();
                
                if(formData[i].value.trim().length === 0) {
                    return false;
                }
                else if(formData[i].name === "confirm" && formData[i].value !== formData[i-1].value) {
                    return false;
                }
                else if(i === (formData.length - 1)) {
                    
                    if(window.location.pathname === '/contact') {
                        var firstname, lastname, email, message;
                        for(var j=0; j<formData.length;j++) {
                            if(formData[j].name === 'firstname') firstname = formData[j].value;
                            else if(formData[j].name === 'lastname') lastname = formData[j].value;
                            else if(formData[j].name === 'email') email = formData[j].value;
                            else if(formData[j].name === 'message') message = formData[j].value;
                            else return false;
                        }
                        $.post('/api/service/sendmail', {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            message: message
                        })
                        .done(function(response) {
                            var alert;
                            
                            if (response.status === 'success') { 
                                alert = '<p class="alert success">' +
                                            '<i class="fa fa-check-circle" aria-hidden="true"></i>' +
                                            response.message +
                                            '<br> You will be redirect in few seconds to login.' +
                                        '</p>';
                                
                                console.log(alert);
                                $('#contact_form').append(alert);
                                
                                setTimeout(function() { 
                                    window.location = "/login"; 
                                }, 5000);
                            }
                            else if (response.status === 'error') {
                                alert = '<p class="alert danger">' +
                                            '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
                                            response.message +
                                        '</p>';
                                
                                $('#contact_form').append(alert);
                            }
                        });
                    }
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
            $('body > footer').css('position', 'absolute')
                              .css('bottom', '0px');
        }

        $(window).resize(function(){
            microseo.ui.footer();
        })
    }
});