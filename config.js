const nodeMailer = require('nodemailer');
const emailTemplates = require('email-templates');
const fs = require('fs');
const ejs = require('ejs');
//mail configurations
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'akgecscrolls18@gmail.com', 
        pass: 'hashakgec18'
    }
}); 
let readHTMLFile = function(path, callback) {
    
    fs.readFile(path, {encoding: 'utf-8'}, function(err, html) {
        if(err) {
            callback(err); 
        } else {
            
            callback(null, html);
        }
    })
}
module.exports = {
    secret: "Qdhyi59BhPZsjRkg",
    connection: 'mongodb://scrolls-admin:5ky2n11@ds133762.mlab.com:33762/scrolls18',
    captchaKey: '6Led_G0UAAAAAOFOdrJyTYIk3A6mjsXDlE_4aOjz',
    captchaKeyv2: '6LeVY3EUAAAAAFVVVDsQZuf6hCTasmifzEU71-7c',
    sendYourMail: function(templatePath, from, to, subject, templateVar, callback) {
        readHTMLFile(templatePath, function(err, html) {
            if (err) throw err;
            let template = ejs.compile(html);
            let htmlToSend = template(templateVar);
            let mailOptions = {
                from: from,
                to: to,
                subject: subject,
                html: htmlToSend
            }
            transporter.sendMail(mailOptions, function(error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    callback(null, response);
                }
            })
        });
    }
}