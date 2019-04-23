var passport = require('passport');
var jwt = require('jsonwebtoken');
var bearerStrategy = require('passport-http-bearer');
var User = require('../models/user');
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2';




passport.use(new bearerStrategy(function (token, done) {
    
    jwt.verify(token,JWT_SIGN_SECRET, function (err, decoded) {
        if (err) return (err);
        if (decoded) {
            
            User.findOne({ _id: decoded.data._id }, function (err, users) {
                if (err) { return done(err); }
                if (!users) { return done(null, false); }
                return done(null, true);
            });
        }
    })
})
);