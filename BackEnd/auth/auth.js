var jwt = require('jsonwebtoken');

module.exports.authenticate = function (req, res, next) {

    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2', function(err , decoded){
        if (err){
          res.send('Unauthorized');
        }
        if (decoded){
          next();
        }
    })
}
