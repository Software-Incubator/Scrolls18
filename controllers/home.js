const Phase = require('../models/phase');
const ImpDate = require('../models/impDate');

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
    })
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
                res.status(200).json({error:{status:true, errorInfo:null}, teams:doc});
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
    }
}