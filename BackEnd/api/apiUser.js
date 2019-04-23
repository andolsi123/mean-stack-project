var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', function (req, res) {
    var email = req.body.email;
    User.findOne({ email: email }).exec((err, users) => {
        if (err) {
            res.send(err);
        }
        if (!users) {
            res.send('wrong email')
        }
        if (bcrypt.compareSync(req.body.password, users.password)) {
            let token = jwt.sign({data: users},"HS384",{ expiresIn: '3600'});
            res.send({
                success: true,
                message: 'Authentication successful!',
                access_token: token,
            });




        } else {
            res.send('wrong password')
        }
    })
});
/* router.post('/signup', async (req,res) => {

}) */

module.exports = router;
