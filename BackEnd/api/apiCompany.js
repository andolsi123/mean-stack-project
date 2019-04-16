var router = require('express').Router();
var Company = require('../models/company');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/user');

router.post('/addCompany', function (req, res) {
    // motpass = req.body.Pword;
    // var hash = bcrypt.hashSync(motpass, 10);
    // req.body.password = hash;
    var company = new Company(req.body);
    company.save(function (err, company) {

        if (err) {
            res.send(err);
        }
        // var user = new User(req.body);
        // user.company = company._id;
        // user.save(function (err2, user) {
        //     if (err2) {
        //         res.send(err2);
        //     }
        //     res.send(user);
        // })
        res.send(user);
    })

});


module.exports = router;