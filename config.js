const nodeMailer = require('nodemailer');
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

module.exports = {
    secret: "Qdhyi59BhPZsjRkg",
    connection: 'mongodb://scrolls-admin:5ky2n11@ds133762.mlab.com:33762/scrolls18',
    transporter: transporter,
    mailOptions: {
        from: 'akgecscrolls18@gmail.com',
        to: 'suyashsrv7@gmail.com',
        subject: "Team registered",
        html: "<p> Congratulations </p>"
    } 
}