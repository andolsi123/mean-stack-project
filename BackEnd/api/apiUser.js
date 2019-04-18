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
        if (bcrypt.compare(req.body.password, users.password, function (err, isValid) {
            if (isValid) {
                if (users.company) {
                    console.log("company");
                    User.findOne({
                        email: email
                    }).exec(function (err, company) {
                        const token = jwt.sign({
                            '_id':users._id,
                            'email': email,
                            'role':" company",
                            'nameCompany': company.nameCompany,
                            'company': users.company
                        },
                        "HS384", {
                                expiresIn: '1h'
                            }
                            );
                        res.send({
                            Message: 'Authentication successful!',
                            token: token   
                        });
                    });
                  
                }
                if (users.freelancer) {
                    console.log("frellancer");
                    User.findOne({
                        email: email
                    }).exec(function (err, freelancer) {
                        const token = jwt.sign({
                            '_id': users._id,
                            'email': users.email,
                            'role': "freelancer",
                            'first_name': users.freelancer.first_name,
                            'last_name': users.freelancer.first_name,
                            'freelancer': users.freelancer
                        },
                        "HS384", {
                                expiresIn: '1h'
                            });

                            res.send({
                                Message: 'Authentication successful!',
                                token: token
                            });  
                    });
                   
                }
               
            }else{
                res.send('wrong password'); 
            }
        }
        ));
    });
})

/* router.post('/signup', async (req,res) => {

}) */

module.exports = router;