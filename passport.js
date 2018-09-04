const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./config');
const Team = require('./models/team');
let opts = {};
opts.jwtFromRequest = function(req) {
        let string = (req.headers.authorization).split(' ');
        if(req && req.headers.authorization) {
            return (string[1]);
        }
        return null;
    }
opts.secretOrKey = config.secret;
passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    Team.findOne({teamId: jwt_payload._id}, function(err, team) {
        
        if (err) {
            return done(err, false);
        }
        if (team) {
            return done(null, team);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


// function(req) {
//     let string = (req.headers.authorization).split(' ');
//     console.log(string);
//     if(req && req.headers.authorization) {
//         return (string[1]+ ' ' + string[2]);
//     }
//     return null;
// }