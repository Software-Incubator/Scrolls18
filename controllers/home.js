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
    }
}