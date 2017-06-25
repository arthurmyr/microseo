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
        
        $('form').submit(function(e){
            var formData = $(this).serializeArray();
            
            for(var i = 0; i<formData.length; i++) {
                
                // Filter value //
                if(formData[i].value.trim().length === 0) {
                    return false;
                }
                else if(formData[i].name === "confirm" && formData[i].value !== formData[i-1].value) {
                    return false;
                }
                else if(i === (formData.length - 1)) {
                //////////////////
                    
                    if(window.location.pathname === '/contact') {
                        e.preventDefault();
                        var firstname, lastname, email, message;
                        for(var j=0; j<formData.length;j++) {
                            if(formData[j].name === 'firstname') firstname = formData[j].value;
                            else if(formData[j].name === 'lastname') lastname = formData[j].value;
                            else if(formData[j].name === 'email') email = formData[j].value;
                            else if(formData[j].name === 'message') message = formData[j].value;
                            else return false;
                            
                            if (j === (formData.length-1)) {
                                $.post('/api/service/mail/contact-us', {
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
                                                '</p>';

                                        if($('.alert').length) $('.alert').remove();
                                        $('#contact_form').append(alert);
                                    }
                                    else if (response.status === 'error') {
                                        alert = '<p class="alert danger">' +
                                                    '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
                                                    response.message +
                                                '</p>';

                                        if($('.alert').length) $('.alert').remove();
                                        $('#contact_form').append(alert);
                                    }
                                });
                            }
                        }
                    }
                    else if(window.location.pathname === "/signup") {
                        e.preventDefault();
                        var firstname, lastname, email, password;
                        for(var j=0; j<formData.length;j++) {
                            if(formData[j].name === 'firstname') firstname = formData[j].value;
                            else if(formData[j].name === 'lastname') lastname = formData[j].value;
                            else if(formData[j].name === 'email') email = formData[j].value;
                            else if(formData[j].name === 'password') password = formData[j].value;
                            else return false;
                            
                            if (j === (formData.length-2)) {
                                $.post('/api/user', {
                                    firstname: firstname,
                                    lastname: lastname,
                                    email: email,
                                    password: password
                                })
                                .always(function(response) {
                                    if(response.responseJSON) response = response.responseJSON;
                                    var alert;
                                    if (response.status === 'success') {
                                        alert = '<p class="alert success">' +
                                                    '<i class="fa fa-check-circle" aria-hidden="true"></i>' +
                                                    response.message +
                                                '</p>';
                                        
                                        if($('.alert').length) $('.alert').remove();
                                        $('#signup_form').append(alert);
                                    }
                                    else if (response.status === 'error') {
                                        alert = '<p class="alert danger">' +
                                                    '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
                                                    response.message +
                                                '</p>';
                                        
                                        if($('.alert').length) $('.alert').remove();
                                        $('#signup_form').append(alert);
                                    }
                                });
                            }
                        }
                        
                    }
                    else if(window.location.pathname === "/login") {
                        e.preventDefault();
                        var email, password;
                        for(var j=0; j<formData.length;j++) {
                            if(formData[j].name === 'email') email = formData[j].value;
                            else if(formData[j].name === 'password') password = formData[j].value;
                            else return false;
                            
                            if (j === (formData.length-1)) {
                                $.post('/api/user/login', {
                                    email: email,
                                    password: password
                                })
                                .always(function(response) {
                                    if(response.responseJSON) response = response.responseJSON;
                                    var alert;
                                    if(response.status === 'success' && response.valid === true) {
                                        var form = document.querySelector('#login_form');
                                        form.submit(); // will not fire the jquery submit event
                                    }
                                    if (response.status === 'error' || (response.status === 'success' && response.valid === false)) {
                                        alert = '<p class="alert danger">' +
                                                    '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
                                                    response.message +
                                                '</p>';
                                        if($('.alert').length) $('.alert').remove();
                                        $('#login_form').append(alert);
                                    }
                                });
                            }
                        }
                    }
                }   
            }
        });
    }
    
    microseo.ui.popup = function() {
        if(window.location.pathname === '/dashboard') {
            var confirm = microseo.tools.getParameterByName('confirm'); 
            if(confirm === 'true') {
                var popupHTML = 
                '<div class="black-overlay">\
                    <div class="popup success">\
                        <header>\
                            <p>Account activation</p>\
                        </header>\
                        <main>\
                            <p>Your account is now activated, you can enjoy our SEO services.</p>\
                            <p>Don\'t hesitate to contact us for any problem or question about MicroSeo.</p>\
                            <p class="signature">The MicroSeo Team</p>\
                            <button class="sm-btn valid" type="button">Got it !</button>\
                        </main>\
                    </div>\
                </div>';
                
                $('body > main').append(popupHTML);
            }
            else if(confirm === 'false') {
                var popupHTML = 
                '<div class="black-overlay">\
                    <div class="popup danger">\
                        <header>\
                            <p>Account activation</p>\
                        </header>\
                        <main>\
                            <p>Your account is now activated, you can enjoy our SEO services.</p>\
                            <p>Don\'t hesitate to contact us for any problem or question about MicroSeo.</p>\
                            <p class="signature">The MicroSeo Team</p>\
                            <button class="sm-btn danger" type="button">Got it !</button>\
                        </main>\
                    </div>\
                </div>';
                
                $('body > main').append(popupHTML);
            }
        }
        $('.popup button').click(function(e) {
            $(this).parent().parent().parent().remove();
        });
        function placePopup() {
            var popupAbsoluteTop = ($(window).outerHeight() / 2) - ($('.popup').outerHeight() / 2);
            $('.popup').css('top', popupAbsoluteTop);
            
            $(window).resize(function() {
                setTimeout(function() {
                    placePopup();
                }, 500);
            });
        }
        placePopup();
    }
    
    microseo.ui.footer = function() {
        var windowHeight = $(window).outerHeight();
        var windowWidth = $(window).outerWidth();
        var headerHeight = $('body > header').outerHeight();
        var footerHeight = $('body > footer').outerHeight();
        var contentHeight = $('body > main').outerHeight();
        var footer = $('body > footer');
        
        console.log(contentHeight);
        console.log((windowHeight - headerHeight - footerHeight));
        if(contentHeight < (windowHeight - headerHeight - footerHeight)) {
        console.log(true);
            footer.css('position', 'absolute')
                  .css('bottom', '0px')
                  .css('z-index', 10);
        }
        
        $(window).resize(function(){
            setTimeout(function() {  
                microseo.ui.footer();
            }, 500);
        })
    }
    
    microseo.ui.particules = function() {
        if(window.location.pathname !== '/') return;
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#0094CC"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#00adef"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 128.27296486924183,
                    "color": "#00adef",
                    "opacity": 0.3367165327817598,
                    "width": 0.9620472365193136
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 167.83216783216784,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    microseo.ui.welcome = function() {
        if(window.location.pathname !== "/") return;
        var blockHeight = $('.welcome').outerHeight();
        var windowHeight = $(window).outerHeight();
        $('.welcome').css('top', (windowHeight / 2) - (blockHeight / 2) - 50);
        
        $(window).resize(function(){
            setTimeout(function() {  
                microseo.ui.welcome();
            }, 500);
        })
    }
    
    microseo.ui.audit = function() {
        
    }
});