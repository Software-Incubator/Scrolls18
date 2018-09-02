const express = require('express');
const authController = require('../controllers/auth');
let config = require('../config');
const router = express.Router();

router.post('/signUp', authController.signUp);
router.get('/sendEmail', function(req, res){
    config.transporter.sendMail(config.mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log("success", info);
        res.end();
     });
})

module.exports = router;