const Phase = require('../models/phase');
const ImpDate = require('../models/impDate');

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
        Phase.find({status: true}, function(err, phaseDoc) {
            if (err) throw err;
            else res.status(200).json({error:{status: false, errorInfo: null}, currentPhase: phaseDoc});
        })
    },

    setThisPhaseAsCurrent: (req, res) => {
        Phase.update({status: true}, {status: false}, function(err, phaseDoc) {
            if(err) throw err;
            Phase.update({phaseName: req.body.phaseName}, {status: true}, function(err, setCurrentPhase) {
                if(err) throw err;
                else res.status(200).json({error:{status: false, errorInfo: null},msg: "current phase set",});
            });
        });
    },

    createImportantDates: (req, res) => {
        let impdate = new ImpDate({
            date: req.body.date,
            description: req.body.description
        });

        impdate.save(function(err, newDateDoc) {
            if (err) throw err;
            else res.status(200).json({error:{status:false, errorInfo: null}, msg:"Date Created"});
        });
    },

    getImportantDates: (req, res) => {
        ImpDate.find(function(err, res) {
            if (err) throw err;
            else res.status(200).json({error:{status: false, errorInfo: null}, impDates: res});
        })
    }
}