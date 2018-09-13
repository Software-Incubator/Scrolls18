const Teams = require('../models/team');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const config = require('../config');
const bcrypt = require('bcrypt');
const path = require('path');

const saltRounds = 10;

function verifyTokenUtil(token , cb) {
    jwt.verify(token, config.secret, function(err, decoded) {
        console.log(decoded);
        if(err) {
            cb(false);
        } else {
            if(decoded) {
                cb(true)
            } else {
                cb(true);
            }
        }
    })
}


module.exports = {
    
    signUp: (req, res) => {
        /* teamName, password, email */
        Teams.find({teamName: req.body.teamName}, function(err, doc) {
            if(doc.length == 0){
                const teamId = randomString.generate({
                    length: 5,
                    charset: 'alphanumeric'
                });
                teamId = "SC18" + teamId;
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    if (err) throw err
                    const newTeam = new Teams({
                        teamName: req.body.teamName,
                        teamId: teamId,
                        email: req.body.email,
                        password: hash
                    });
                    newTeam.save(function(err, newDoc) {
                        if (err) 
                            throw err;
                        else {
                            //edit mailoptions from, to, subject, html
                            const templatePath = path.join(__dirname, '../mail-templates/html.ejs');
                            const subject = "Team Registered";
                            const templates = {
                                teamname: newDoc.teamName,
                                teamid: newDoc.teamId
                            };
                            const from = 'akgecscrolls18@gmail.com';
                            config.sendYourMail(
                                templatePath, 
                                from, 
                                newDoc.email,
                                subject,
                                templates,
                                function(err, info) {
                                    if (err)
                                        res.status(500).json({error: {status: true, errorInfo: "Could not send mail"},msg: "Team registered"});
                                    else {
                                        // console.log("success", info);
                                        res.status(200).json({error: {status: false, errorInfo: null},msg: "Team registered"})
                                    }
                                }
                            );
                        }
                    });
                });
            } else {
                res.status(409).json({error: {status: true, errorInfo: "409 conflict"},msg: "Team already registered"})

            }
        });
    },

    login: (req, res) => {
        Teams.find({teamId: req.body.teamId}, function(err, regTeam) {
            if (err) {
                res.status(500).json({error:{
                    status: true,
                    errorInfo: err
                }, token: null});
            } else if (regTeam.length > 0) {
                bcrypt.compare(req.body.password, regTeam[0].password).then( function(same) {
                    if(same) {
                        jwt.sign({sub: regTeam[0]._id}, config.secret, {expiresIn: '24h'}, function(err, token){
                            res.status(200).json({error:{
                                status: false,
                                errorInfo: null
                            }, token: token});
                        });
                    } else {
                        res.status(401).json({error:{
                            status: true,
                            errorInfo: "TeamId or password is wrong" 
                        }, token: null});
                    }
                }).catch(function(err) {
                    throw err;
                }) ;
            } else {
                res.status(404).json({error:{
                    status: true,
                    errorInfo: "Team not found" 
                }, token: null});
            }
        });
    },

    verifyToken: (req, res) => {
        verifyTokenUtil(req.body.token, function(response) {
            if(response) {
                res.status(200).json({error: {
                        status: false,
                        errorInfo: null
                    },
                    msg: "token confirmed",
                    token: req.body.token
                });
            } else {
                res.status(401).json({error: {
                        status: true,
                        errorInfo: "Token Expired"
                    },
                    msg: "Authentication required",
                    token: null
                });
            }
        });
    },
    verifyTokenUtil: verifyTokenUtil
}
