const config = require('../config');
const Admin = require('../models/admin');
function verifyTokenUtil(token , cb) {
    jwt.verify(token, config.secret, function(err, decoded) {
        let id = decoded.sub;
        if(err) {
            cb(false);
        } else {
            if(decoded && decoded != undefined) {
                Admin.findById(id, function(err, admin) {
                    if(err)
                        throw err;
                    else if(admin) {
                        cb(true)
                    }
                });
            } else {
                cb(false);
            }
        }
    })
}


module.exports = {
    adminGaurd: (req, res, next) => {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        verifyTokenUtil(token, function(response) {
            if(response)
                next();
            else
                res.status(401).send("unauthorized");
        });
    }
}