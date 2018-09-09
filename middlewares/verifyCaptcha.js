const config = require('../config');
const request = require('request');

module.exports = {
    verifyCaptcha: (req, res, next) => {
        
        var requestQuery = req.body;
        if( requestQuery != undefined && requestQuery != '' && requestQuery != null && requestQuery.response != undefined && requestQuery.response != '' && requestQuery.response != null ){
            var response = requestQuery.response;
                var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret="+ config.captchaKey +"&response=" +response;
                // Hitting GET request to the URL, Google will respond with success or error scenario.
                request(verificationUrl,function(error,response,body) {
                    console.log(response, body);
                body = JSON.parse(body);
                console.log(body);
                // Success will be true or false depending upon captcha validation.
                    if(body.success !== undefined && !body.success) {
                        res.send({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
                    }else{
                        next();
                    }
                });
        }else{
            res.send({"responseCode" : 1,"responseDesc" : "Failed captcha verification *"});
        }
    }
}