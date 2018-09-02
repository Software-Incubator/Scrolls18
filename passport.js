const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');
const Team = require('./models/team');
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    Team.findOne({teamId: jwt_payload.sub}, function(err, team) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, team);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});

module.export = strategy;