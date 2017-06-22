var nodemailer = require('nodemailer'),
    htmlToText = require('nodemailer-html-to-text').htmlToText;

module.exports = function() {
    return {        
        transporter: (function() {
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'microseo.staff@gmail.com',
                    pass: 'oWAeUmXsy5scH95rK'
                }
            });
            transporter.use('compile', htmlToText());
            
            return transporter;
        })(),
        send: function(data, cb) {
            var mailOptions = {
                from: '"MicroSeo" <microseo.staff@gmail.com>',
                to: data.to,
                subject: data.subject,
                html: data.html
            };

            this.transporter.sendMail(mailOptions, function(err, info) {
                cb(err, info);
            });
        },
        generateTemplate: function(mail) {
            if(!mail.type) {
                return false;
            }
            if(mail.type === 'clientMail' && (!mail.message || !mail.firstname || !mail.lastname || !mail.email)) {
                return false;
            }
            if(mail.type === 'confirmMail' && (!mail.token)) {
               return false;
            }
            
            var document = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns:v="urn:schemas-microsoft-com:vml"> <head> <meta http-equiv="content-type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"> </head> <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"> <table bgcolor="#363636" width="100%" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td style="text-align: center;"> <a href="http://microseo.meyera.pro"> <img src="https://drive.google.com/uc?export=view&id=0B8Ol1OLqSPvVS2xCV21mX3lEMDg" width="80" border="0" alt="Logo de MicroSeo" target="_blank" /> </a> </td> </tr> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td align="center" style="text-align:center; font-size:30px; color:#00ADEF; font-family: Arial,sans-serif; font-weight: 600">';
            
            var title;
            if(mail.type === 'clientMail') title = "Client message";
            else if(mail.type === 'confirmMail') title = "Welcome to MicroSeo";
            
            document += title + '</td> </tr> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr>';

            if(mail.type === 'clientMail') {
                document += '<tr> <td align="center" style="text-align:center; font-size:15px; font-family:\'Trebuchet MS\',sans-serif; line-height: 23px; color:white;">';
                document += 'Firstname: ' + mail.firstname + 
                '<br>Lastname: ' + mail.lastname +
                '<br>Email: <a href="mailto:meyeradev@gmail.com" style="color: white; text-decoration: none;">' + mail.email 
                + '</a><br></td> </tr>';
            }
                
            document += '<tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td align="center" style="text-align:center; font-size:15px; font-family:\'Trebuchet MS\',sans-serif; line-height: 21px; color: white; padding-left: 50px; padding-right: 50px">';
            
            if(mail.type === 'clientMail') {
                document += mail.message;    
            } 
            if(mail.type === 'confirmMail') {
                document += 'Dear customer, thank you to trust our services.<br><br> To start use the app, first confirm your email:<br><a href="http://microseo.meyera.pro/confirm?token='+ mail.token +'" style="color:#00ADEF; font-weight:600;" target="_blank">Click here</a>';
            }
                
            document += '</td> </tr> ';
            
            if(mail.type === 'confirmMail') {
                document += '<tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr>'
                + '<tr> <td align="center" style="text-align:center; font-size:15px; font-family:\'Trebuchet MS\',sans-serif; line-height: 21px; color: white; padding-left: 50px; padding-right: 50px">The MicroSeo Team</td> </tr>';
            }
                
            document += '<tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> </tbody> </table> </body></html>';

            return document;
        }
    }
}