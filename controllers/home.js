const Phase = require('../models/phase');
const ImpDate = require('../models/impDate');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const Teams = require('../models/team');
const TeamDetails = require('../models/team_details');
const Members = require('../models/members');
const Synopsis = require('../models/synopsis');
const excel = require('excel4node');
const fs = require('fs');
const path = require('path');

function getCurrentPhaseUtil(callback) {
    Phase.findOne({status: true}, function(err, phaseDoc) {
        callback(err, phaseDoc);
    })
}

function getImportantDatesUtil(callback) {
    ImpDate.find(function(err, response) {
        callback(err, response);
    })
}

function getAllTeamsUtil(callback) {
    Teams.find({}, function(err, doc) {
        callback(err, doc);
    });
}

function deleteTeamUtil(team, cb) {
    deleteTeamDetailsUtil(team, function(err, res) {
        if(err) 
            cb(err, null);
        deleteMembersUtil(team, function(err, resp) {
            if(err)
                cb(err, null);
            deleteSynopsisUtil(team, function(err, respo) {
                if(err)
                    cb(err, null);
                Teams.findOneAndRemove({_id: team}, function(err, response) {
                    if(err)
                        cb(err, null);
                    else {
                        cb(null, response);
                    }
                })
            })
        })
    })
}

function deleteTeamDetailsUtil(team, cb){
    TeamDetails.findOneAndRemove({teamId: team}, function(err, res) {
        cb(err, res);
    })
}

function deleteMembersUtil(team, cb) {
    Members.remove({teamId: team}, function(err, res) {
        cb(err, res);
    })
}

function deleteSynopsisUtil(team, cb) {
    Synopsis.findOneAndRemove({teamId: team}, function(err, res) {
        cb(err, res);
    })
}
module.exports = {
    createAdmin : (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) throw err;
            let newAdmin = new Admin({
                username: username,
                password: hash
            });
            newAdmin.save(function(err, newAdminDoc) {
                console.log(newAdminDoc);
            });
        })
    },

    createPhase: (req, res) => {
        const phase = {
            phaseName: req.body.phaseName
        }
        let newPhase = new Phase(phase);
        newPhase.save(function(err, newPhaseDoc) {
            if(err) throw err;
            else res.status(200).json({error:{status: false, errorInfo: null},msg: "New Phase created",});
        })
    },
    
    getCurrentPhase: (req, res) => {
        getCurrentPhaseUtil(function(err, phaseDoc) {
            if (err) res.status(500).json({error:{status: true, errorInfo: err}});
            else res.status(200).json({error:{status: false, errorInfo: null}, currentPhase: phaseDoc});
        })
    },

    setThisPhaseAsCurrent: (req, res) => {
        Phase.update({status: true}, {status: false}, function(err, phaseDoc) {
            if(err) throw err;
            Phase.update({phaseName: req.body.phaseName}, {status: true}, function(err, setCurrentPhase) {
                console.log(setCurrentPhase);
                if(err) throw err;
                else res.status(200).json({error:{status: false, errorInfo: null},msg: "current phase set",});
            });
        });
    },

    createImportantDates: (req, res) => {
        let impdate = new ImpDate({
            date: req.body.date,
            month:req.body.month,
            year:req.body.year,
            description: req.body.description
        });

        impdate.save(function(err, newDateDoc) {
            if (err) throw err;
            else res.status(200).json({error:{status:false, errorInfo: null}, msg:"Date Created"});
        });
    },

    getImportantDates: (req, res) => {
       getImportantDatesUtil(function(err, impDates) {
            if(err) res.status(500).json({error:{status: true, errorInfo: err}});;
            getCurrentPhaseUtil(function(err, phase) {
                if (err) res.status(500).json({error:{status: true, errorInfo: err}});
                else res.status(200).json({error:{status: false, errorInfo: null}, impDates, phase});
            })
       })
    },

    getAllTeams: (req, res) => {
        getAllTeamsUtil(function(err, doc) {
            if(err)
                res.status(500).json({error:{status:true, errorInfo:err}, msg:"something went wrong"});
            else {
                teams = [];
                for(let k=0; k<doc.length; k++){
                    doc[k].password = undefined;
                }
                res.status(200).json({error:{status:false, errorInfo:null}, teams:doc});
            }
        })
    },

    getTeamDetails: (req, res) => {
        let teamId = req.param('id');
        console.log(teamId);
        details = {};
        TeamDetails.find({id: teamId}, function(err, teamDetails) {
            if (err) throw err;
            if(teamDetails && teamDetails.length > 0){
                details.teamDetails = teamDetails;
                Members.find({teamId: teamId}, function(err, members) {
                    if (err) throw err;
                    if(members && members.length > 0) {
                        details.members = members;
                        Synopsis.findOne({teamId: teamId}, function(err, synopsis) {
                            if (err) throw err;
                            if(synopsis) {
                                details.synopsis = synopsis;
                                res.status(200).json({error:{status:false, errorInfo:null}, details:details});
                            } else {
                                res.status(200).json({error:{status:false, errorInfo:null}, details:details});
                            }
                            
                        })
                    } else {
                        res.status(200).json({error:{status:false, errorInfo:null}, details:details});
                    }

                });
            } else {
                res.status(200).json({error:{status:false, errorInfo:null}, details:null});
            }
        })
    },

    deleteTeam: (req, res) => {
        team = req.body.teamId;
        deleteTeamUtil(team, function(err, response) {
            if(err)
                res.status(500).json({error:{status: true, errorInfo: err}});
            else
                res.status(200).json({error:{status:false, errorInfo:null}, msg:"Team removed successfully", response:response});
        })
    },

    generateExcel: (req, res) => {
        var wb = new excel.Workbook();
        var ws = wb.addWorksheet('Sheet 1'); 
        var style = wb.createStyle({
            font: {
            color: '#000000',
            size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        });  
        getAllTeamsUtil(function(err, teamDoc) {
            var i = 1;
            var a = [[]];
            ar = gen(i, a, teamDoc);
            console.log(ar);
        });
    }
    
}

function gen(i, a, teamDoc) {
    if(i > teamDoc.length)
        return a;
    else {
        a[i-1][0] = teamDoc[i-1].teamName;
        a[i-1][1] = teamDoc[i-1].teamId;
        return gen(i+1, a, teamDoc);
    }
}