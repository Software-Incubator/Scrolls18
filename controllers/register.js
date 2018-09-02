let Teams = require('../models/team');
let Members = require('../models/members');
let fs = require('fs');
let path = require('path');
let credentials = require('../credentials.json');
const {google} = require('googleapis');
const drive = require('../googleapis');

module.exports = {
    register: (req, res) => {
        Teams.find({name: req.body.name}, function(err, teamdoc) {
            //no previous record found
            if(teamdoc.length == 0){
                let team = new Teams({
                    name: req.body.name,
                    numberOfMembers: req.body.numberOfMembers,
                    domain: req.body.domain,
                    topic: req.body.topic,
                    password: req.body.password
                });
                team.save(function(err, doc) {
                    if(err) res.status(500).json({error: {status:true, errInfo: err}, msg: "could not save team record", token: null });
                    else {
                        // add members 
                        let members = req.body.members;
                        for(var k in members) {
                            let person = members[k];
                            person.teamId = doc._id;
                            let mem = new Members(person);
                            mem.save(function(err, docs) {
                                if(err) res.status(500).json({error: {status:true, errInfo: err}, msg: "could not save member records", token: null });
                                res.end();
                            });
                        }
                        res.status(500).json({error: {status:false, errInfo: null}, msg: "record saved successfully", token:"237uiegfbadfjkg8735tub" });
                    }
                });
            }
            else{
                res.status(409).json({error:{status: true, errInfo:"409 conflict"}, msg:"Team name already registered", token: null})
            }
        })
    },

    file: function(req, res) {
        let file = req.files.file;
        // fs.readFile(path.join(__dirname, '../credentials.json'), (err, content) => {
        //     if (err) return console.log('Error loading client secret file:', err);
        //     // Authorize a client with credentials, then call the Google Drive API.
        //     console.log(JSON.parse(content));
        //     content = JSON.parse(content);
        //     const {client_id, client_secret, redirect_uris} = content.installed;
        //     const oAuth2Client = new google.auth.OAuth2(
        //         client_id, client_secret, redirect_uris[0]);
        //         auth = oAuth2Client;
        //   });
        const drive = google.drive({version: 'v3', auth: oAuth2Client});
        var fileBuffer = Buffer.from(file.data)
        var fileMetadata = {
            name: 'photo',
            mimeType: 'image/jpeg'
        };
        var media = {
            name: "Suyas",
            mimeType: 'image/jpeg',
            body: fileBuffer
        };
        drive.files.create({
            requestBody: {
                "name": 'testimage',
                "mimeType": 'image/jpeg'
              },
              media: {
                "mimeType": 'image/jpeg',
                "body": fileBuffer
              }
            }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                console.log('File Id: ', file);
            }
        });
        res.end("success");
    },

    test: function(req, res) {
        res.sendFile('/test.html', {root: __dirname});
        
       
    }
}
