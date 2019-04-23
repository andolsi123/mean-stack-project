var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Company = require('../models/company');
var freelancer = require('../models/freeLancer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2';

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
                    Company.findOne({ _id: users.company }).then(company => {
                        const token = jwt.sign({
                            'company': company._id,
                            'role': "company",
                            'email': users.email,
                            'password':users.password,
                            'nameCompany': company.nameCompany,
                            'address': company.address,
                            'foundyear': company.foundyear,
                            'phoneNumber': company.phoneNumber,
                            'DescriptionCompany': company.DescriptionCompany,
                            'facebook': company.facebook,
                            'webSite': company.webSite,
                            'logo': company.logo
                        },
                            JWT_SIGN_SECRET, {
                                expiresIn: '1h'
                            }
                        );
                        res.send({
                            Message: 'Authentication successful!',
                            token: token
                        });
                    })
                }
                if (users.freelancer) {
                    freelancer.findOne({ _id: users.freelancer }).then(freelancer => {
                        const token = jwt.sign({
                            '_id.freelancer': freelancer._id,
                            'role': "freelancer",
                            'email': users.email,
                            'first_name': freelancer.first_name,
                            'last_name': freelancer.last_name,
                            'phone_Number': freelancer.phoneNumber,
                            'birthdate': freelancer.birthdate,
                            'rateWork': freelancer.rateWork,
                            'facebook': freelancer.facebook,
                            'githup': freelancer.githup,
                            'twitter': freelancer.twitter,
                            'skils': freelancer.skils,
                            'languages': freelancer.languages,
                            'portfolio': freelancer.portfolio,
                            'Image_Profil': freelancer.Image_Profil,
                            'projects': freelancer.projects,
                        },
                            JWT_SIGN_SECRET, {
                                expiresIn: '1h'
                            });
                        res.send({
                            Message: 'Authentication successful!',
                            token: token
                        });
                    });

                }

            } else {
                res.send('wrong password');
            }
        }
        ));
    });
})

module.exports = router;
