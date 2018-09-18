const Teams = require('../models/team');
const Members = require('../models/members');
const TeamDetails = require('../models/team_details');
const gapi = require('../googleapis');
const fs = require('fs');
const {google} = require('googleapis');
const path = require('path');
const Synopsis = require('../models/synopsis');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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

function resgitserTeamUtil(teamInfo, cb) {
    let newTeamDetails = new TeamDetails(teamInfo);
    newTeamDetails.save(function(err, newTeamDoc) {
        if (err) cb(err, null);
        else cb(null, newTeamDoc);
    })
}

function registerMembersUtil(memberDetails, id,  cb) {
    let membersInfo = [];let errors = [];
    for(let k=0; k< memberDetails.length; k++) {
        memberDetails[k].teamId = id;
    }
    Members.insertMany(memberDetails, function(err, membersInfo) {
        if (err) cb(err, null);
        cb(null, membersInfo);
    });
}

function saveFileInfo(fileId, webViewLink, teamId, fileName, cb) {
    Synopsis.find({teamId: teamId}, function(err, synopsisDoc) {
        if(err) throw err;
        else if(synopsisDoc && synopsisDoc.length > 0) {
            Synopsis.update({teamId: teamId}, {fileId: fileId, webViewLink:webViewLink}, function(err, response) {
                cb(err, response);
            });
        } else {
            let newSynopsis = new Synopsis({
                teamId: teamId,
                fileName: fileName,
                webViewLink: webViewLink,
                fileId: fileId
            });
            newSynopsis.save(function(err, newSynopsisDoc) {
                cb(err, newSynopsisDoc);
            });
        }
    })
}

module.exports = {
    registerTeam: function(req, res) {
        req.body.id = req.user._id;
        var teamInfo = {
            id: req.body.id,
            numberOfMembers: req.body.numberOfMembers,
            topic: req.body.topic,
            domain: req.body.domain
        }
        resgitserTeamUtil(teamInfo, function(err, teamInfoDoc) {
            details = {};
            details.topic = req.body.topic;
            details.domain = req.body.domain;
            if(err) res.status(500).json({error:{status:true, errorInfo:err}, msg:"Team Details could not be saved"});
            else {
                registerMembersUtil(req.body.members, req.user._id, function(err, memberInfoDoc) {
                    if(err)  res.status(500).json({error:{status:true, errorInfo:err}, msg:"Member Details could not be saved"});
                    else {
                        res.status(200).json({error: {status: false, errorInfo:null},details:details, msg:"Team and Member details saved !! Last Step To Go"});
                    }
                });
            }
        })
    },

    getAllDetail: function(req, res) {
        let details = {};
        TeamDetails.find({id: req.user._id}, function(err, teamDetailsDoc) {
            if (err) throw err;
            
            if(teamDetailsDoc){
                details.teamDetails = {
                    teamName: req.user.teamName,
                    teamId: req.user.teamId,
                    numberOfMembers: teamDetailsDoc.numberOfMembers,
                    domain: teamDetailsDoc.domain,
                    topic: teamDetailsDoc.topic 
                };
                let topic = teamDetailsDoc.topic;
                let domain = teamDetailsDoc.domain;
                Members.find({teamId: req.user._id}, function(err, memberDetails) {
                    if(err) throw err;
                    if(memberDetails.length > 0){
                        for(let k=0; k<memberDetails.length; k++){
                            delete memberDetails[k].teamId;
                        }
                        details.memberDetails = memberDetails;
                        // get synopsis details
                        Synopsis.find({teamId: req.user._id}, function(err, synopsisDoc){
                            if(err) throw err;
                            if(synopsisDoc && synopsisDoc.length > 0){
                                details.synopsis = {
                                    name: synopsisDoc.fileName,
                                    webViewLink: synopsisDoc.webViewLink
                                }
                                res.status(200).json({error:{status: false, errorInfo:null}, details:{email:req.user.email,details}, filledStatus:'2'})
                            } else { 
                                res.status(200).json({error:{status:false, errorInfo:null }, details:{email:req.user.email, details}, filledStatus:'1'});
                            }
                        });
                        
                    } else {
                        res.status(200).json({error:{status:true, errorInfo:"Members not found" }, details:{email:req.user.email, details}, filledStatus:'0'})
                    }
                });
            } else {
                res.status(200).json({error:{status:true, errorInfo:"Team details not found" }, details:{email: req.user.email}, filledStatus:'0'});
            }

        });
    },

    uploadFile: function(req, res) {
        let sampleFile = req.files.file;
        console.log(sampleFile);
        TeamDetails.findOne({id: req.user._id}, function(err, doc){
            console.log(doc);
            var fileName = `${doc.domain}_${doc.topic}_${req.user.teamId}` || 'samplePdf'; 
            sampleFile.mv(path.join(__dirname, '../temp/file.pdf'), function(err) {
                if(err) throw err;
                else {
                    var fileMetadata = {
                        'name': `${fileName}.pdf`
                    };
                    var media = {
                        mimeType: 'application/pdf',
                        body: fs.createReadStream(path.join(__dirname, '../temp/file.pdf'))
                    };
                    fs.readFile('credentials.json', (err, content) => {
                        if (err) return console.log('Error loading client secret file:', err);
                        // Authorize a client with credentials, then call the Google Drive API.
                        gapi.authorize(JSON.parse(content), function(auth) {
                            const drive = google.drive({version: 'v3', auth});
                            drive.files.create({
                                resource: fileMetadata,
                                media: media,
                                fields: 'id, webViewLink'
                              }, function (err, file) {
                                    if (err) {
                                        res.status(500).json({error:{status: true, errorInfo: err}, msg:"could not upload file to drive"});
                                    } else {
                                        // console.log(file);
                                        fs.unlink(path.join(__dirname, '../temp/file.pdf'), (err) => {
                                            if (err) 
                                                res.status(500).json({error:{status: true, errorInfo: err}, msg:"could not upload file to drive"});
                                            else {
                                                // replace someId
                                                saveFileInfo(file.data.id, file.data.webViewLink, req.user.id, fileName, (err, response) => {
                                                    if (err) throw err;
                                                    res.status(200).json({error:{status: false, errorInfo: null}, msg:"Congratulations You have Uploaded All your Details Successfully !!", response:response});
                                                });
                                            }
                                        });
                                    }
                                }
                            );
                        });
                    });
                }
            });
        })
        //filename to be added to be handled by frontend
       
        // console.log(req.files);
        
    },

    forgotPassword: (req, res) => {
        let teamId = req.body.teamId;
        let resetlink = "some linlk";
        Teams.findOne({teamId: teamId}, function(err, team) {
            jwt.sign({sub: team._id}, config.secret, {expiresIn: '24h'}, function(err, token){
                 resetlink = token; ///change this 
                 //edit mailoptions from, to, subject, html
                 const templatePath = path.join(__dirname, '../mail-templates/resetPassword.ejs');
                 const subject = "Password Reset";
                 const templates = {
                     resetlink: resetlink
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
                             Teams.updateOne({teamId: teamId}, {resetPasswordToken: token}, function(err, response) {
                                 if(err) throw err;
                                 res.status(200).json({error: {status: false, errorInfo: null},msg: "Link to reset your password has been sent to you"})

                             })
                            
                         }
                     }
                 );
            });
           
        })
        
    },

    resetPassword: (req, res) => {
        let newPaswword = req.body.password;
        let token = req.param(token);
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) throw err;
            if(decoded && decoded != undefined) {
                let teamId = decoded.sub;
                Teams.findOne({teamId:teamId}, function(err, team) {
                    if(err) throw err;
                    if(team && team.resetPasswordToken == token) {
                        bcrypt.hash(newPaswword, 10, function(err, hash) {
                            Teams.updateOne({teamId:teamId}, {password:hash, resetPasswordToken:null}, function(err, response) {
                                if(err) throw err;
                                if(response){
                                    res.status(200).json({error:{status:false, errorInfo:null}, msg:"Password has been reset"});
                                } else {
                                    res.status(200).json({error:{status:false, errorInfo:null}, msg:"Something went wrong please try again"});
                                }
                            })
                        })
                    } else {
                        res.status(400).json({error:{status:true, errorInfo:"Bad request"}, msg:"Link expired"});
                    }
                })
            } else {
                res.status(400).json({error:{status:true, errorInfo:"Bad request"}, msg:"Link expired"});
            }
        })
    },
    
    downloadFile: function(req, res) {
        let fileName = req.query.downloadFile;
        console.log(req.query);
        Synopsis.findOne({fileName: fileName}, function(err, fileInfo) {
            let fileId = fileInfo.fileId;
            let destDir = fs.createWriteStream(path.join(__dirname, `../downloads/${fileName}`));
            fs.readFile('credentials.json', (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Drive API.
                gapi.authorize(JSON.parse(content), function(auth) {
                    const drive = google.drive({version: 'v3', auth});
                    drive.files.export({
                        fileId: fileId,
                        mimeType: 'application/pdf'
                    }, {
                        responseType: 'stream'
                    },function(err, response){
                        if(err) throw err;
                        response.dat.pipe(destDir);
                   });
                });
            });

        });
    }
}
