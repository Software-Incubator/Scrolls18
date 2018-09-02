const Teams = require('../models/team');
const Members = require('../models/members');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const config = require('../config');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    register: (req, res) => {
        Teams.find({name: req.body.name}, function(err, teamdoc) {
            //no previous record found
            if(teamdoc.length == 0){
                let team = new Teams({
                    name: req.body.name,
                    teamId: randomString.generate({length: 8, charset: 'alphanumeric'}),
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
                        let token = jwt.sign({sub: doc._id}, config.secret, {expiresIn: '1h'});
                        res.status(500).json({error: {status:false, errInfo: null}, msg: "record saved successfully", token:token });
                    }
                });
            }
            else{
                res.status(409).json({error:{status: true, errInfo:"409 conflict"}, msg:"Team name already registered", token: null})
            }
        })
    },

    signUp: (req, res) => {
        /* teamName, password, email */
        Teams.find({teamTame: req.body.teamName}, function(err, doc) {
            if(doc.length == 0){
                const teamId = randomString.generate({
                    length: 7,
                    charset: 'alphanumeric'
                });
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
                            const token = jwt.sign({sub: newDoc._id}, config.secret, {expiresIn: '24h'});
                            res.status(200).json({error: {status: false, errorInfo: null},
                                    msg: "Team registered",
                                    token: token
                            });
                        }
                    });
                });
            }
        
    });

    }
}
