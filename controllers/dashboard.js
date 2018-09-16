const Teams = require('../models/team');
const Members = require('../models/members');
const TeamDetails = require('../models/team_details');
const gapi = require('../googleapis');
const fs = require('fs');
const {google} = require('googleapis');
const path = require('path');
const Synopsis = require('../models/synopsis');


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
            if(err) res.status(500).json({error:{status:true, errorInfo:err}, msg:"Team Details could not be saved"});
            else {
                registerMembersUtil(req.body.members, req.user._id, function(err, memberInfoDoc) {
                    if(err)  res.status(500).json({error:{status:true, errorInfo:err}, msg:"Member Details could not be saved"});
                    else {
                        res.status(200).json({error: {status: false, errorInfo:null}, msg:"Team and Member details saved"});
                    }
                });
            }
        })
    },

    getAllDetail: function(req, res) {
        let details = {};
        TeamDetails.findOne({id: req.user._id}, function(err, teamDetailsDoc) {
            if (err) throw err;
            if(teamDetailsDoc && teamDetails.length > 0){
                details.teamDetails = {
                    teamName: req.user.teamName,
                    teamId: req.user.teamName,
                    numberOfMembers: teamDetailsDoc.numberOfMembers,
                    domain: teamDetailsDoc.domain,
                    topic: teamDetailsDoc.topic 
                };
                Members.find({teamId: req.user._id}, function(err, memberDetails) {
                    if(err) throw err;
                    if(memberDetails.length > 0){
                        for(let k=0; k<memberDetails.length; k++){
                            delete memberDetails[k].teamId;
                        }
                        details.memberDetails = memberDetails;
                        // get synopsis details
                        Synopsis.find({teamId: req.user_id}, function(err, synopsisDoc){
                            if(err) throw err;
                            if(synopsisDoc && synopsisDoc.length > 0){
                                details.synopsis = {
                                    name: synopsisDoc.fileName,
                                    webViewLink: synopsisDoc.webViewLink
                                }
                                res.satus(200).json({error:{status: false, errorInfo:null}, details:details, filledStatus:'2'})
                            } else {
                                res.status(200).json({error:{status:false, errorInfo:null }, details:details, filledStatus:'1'});
                            }
                        });
                        
                    } else {
                        res.status(200).json({error:{status:true, errorInfo:"Members not found" }, details:details, filledStatus:'0'})
                    }
                });
            } else {
                res.status(404).json({error:{status:true, errorInfo:"Team details not found" }, details:null, filledStatus:'0'});
            }

        });
    },

    uploadFile: function(req, res) {
        let sampleFile = req.files.foo;
        //filename to be added to be handled by frontend
        var fileName = `${req.body.teamName}_${req.body.domain}_${req.body.topic}` || 'samplePdf'; 
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
                                    console.log(file);
                                    fs.unlink(path.join(__dirname, '../temp/file.pdf'), (err) => {
                                        if (err) 
                                            res.status(500).json({error:{status: true, errorInfo: err}, msg:"could not upload file to drive"});
                                        else {
                                            // replace someId
                                            saveFileInfo(file.data.id, webViewLink, "5b915de98c21bb138cbd52d2", fileName, (err, response) => {
                                                if (err) throw err;
                                                res.status(200).json({error:{status: false, errorInfo: null}, msg:"File saved succesfully", response:response});
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
        // console.log(req.files);
        
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
