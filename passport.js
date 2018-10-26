const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./config');
const Team = require('./models/team');
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    Team.findOne({_id: jwt_payload.sub}, function(err, team) {
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