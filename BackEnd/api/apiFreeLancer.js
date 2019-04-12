var router = require('express').Router();
var Freelancer = require('../models/freeLancer');
var User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/addfree', function (req, res) {
    motpass = req.body.password;
    var hash = bcrypt.hashSync(motpass, saltRounds);
    req.body.password = hash;
    var free = new Freelancer(req.body);
    free.save(function (err, freelancer) {
        if (err) {
            res.send(err);
        }
        var user = new User(req.body);
        user.freelancer = freelancer._id;
        user.save(function (err, user) {
            if (err) {
                res.send(err);
            }
            res.send(user);
        })
    })
 });

module.exports = router;