var nodemailer = require('nodemailer');

module.exports = {
    transporter: nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'microseo.staff@gmail.com',
            pass: 'oWAeUmXsy5scH95rK'
        }
    }),
    send: function(data, cb) {
        var mailOptions = {
            from: '"MicroSeo Staff" <microseo.staff@gmail.com>',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        };

        this.transporter.sendMail(mailOptions, function(err, info) {
            cb(err, info);
        });
    },
    generateTemplate: function(data) {
        var document = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns:v="urn:schemas-microsoft-com:vml"> <head> <meta http-equiv="content-type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"> </head> <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"> <table bgcolor="#363636" width="100%" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td style="text-align: center;"> <a href="http://microseo.meyera.pro"> <img src="https://drive.google.com/uc?export=view&id=0B8Ol1OLqSPvVS2xCV21mX3lEMDg" width="80" border="0" alt="Logo de MicroSeo" target="_blank" /> </a> </td> </tr> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td align="center" style="text-align:center; font-size:30px; color:#00ADEF; font-family: Arial,sans-serif; font-weight: 600">'
        + data.title +
        '</td> </tr> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td align="center" style="text-align:center; font-size:15px; font-family:\'Trebuchet MS\',sans-serif; line-height: 23px; color:white;">Firstname: '
        + data.firstname + 
        '<br>Lastname: '
        + data.lastname +
        '<br>Email: <a href="mailto:meyeradev@gmail.com" style="color: white; text-decoration: none;">'
        + data.email +
        '</a><br></td> </tr> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> <tr> <td align="center" style="text-align:center; font-size:15px; font-family:\'Trebuchet MS\',sans-serif; line-height: 21px; color: white; padding-left: 50px; padding-right: 50px">'
        + data.message +
        '</td> </tr> <tr> <td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td> </tr> </tbody> </table> </body></html>';
            
        return document;
    }
}