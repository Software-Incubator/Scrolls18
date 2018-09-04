const Teams = require('../models/team');
const Members = require('../models/members');
const TeamDetails = require('../models/team_details');

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

module.exports = {
    registerTeam: function(req, res) {
        req.body.teamInfo.id = req.user._id;
        resgitserTeamUtil(req.body.teamInfo, function(err, teamInfoDoc) {
            if(err) res.status(500).json({error:{status:true, errorInfo:err}, msg:"Team Details could not be saved"});
            else {
                registerMembersUtil(req.body.memberDetails, req.user._id, function(err, memberInfoDoc) {
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
            if(teamDetailsDoc.length > 0){
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
                        req.status(200).json({error:{status:false, errorInfo:null }, details:details});
                    } else {
                        req.status(200).json({error:{status:true, errorInfo:"Members not found" }, details:details})
                    }
                });
            } else {
                req.status(404).json({error:{status:true, errorInfo:"Team details not found" }, details:null});
            }

        });
    }
}