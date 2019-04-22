var router = require('express').Router();
var Company = require('../models/company');
const bcrypt = require('bcrypt');
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2';
const saltRounds = 10;
var User = require('../models/user');
var passport = require('passport');
const multer = require("multer");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var ObjectID = mongoose.Types.ObjectId;


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

router.post('/addCompany', upload.single('logo'), function (req, res) {
    motpass = req.body.password;
    var hash = bcrypt.hashSync(motpass, saltRounds);
    req.body.password = hash;
    req.body.logo = req.file.filename;
    var company = new Company(req.body);
    company.save(function (err, company) {

        if (err) {
            res.send(err);
        }
        var user = new User(req.body);
        user.company = company._id;
        user.save(function (err2, user) {
            if (err2) {
                res.send(err2);
            }
            res.send(user);
        })
    })
});

router.get('/getCompany/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
    var id = ObjectID(req.params.id);
    Company.findById(id).exec((err, company) => {
        if (err) {
            res.send(err);
        }
        res.send(company);
    });
});



router.post('/updateCompany/:id', upload.single('logo'), passport.authenticate('bearer', { session: false }), function (req, res) {

    var id = req.params.id
    req.body.logo = req.file.filename;  
    Company.findByIdAndUpdate({ "_id": id }, { $set: req.body }).exec(function (err, company) {
        if (err) {
            res.send(err)

        }
        else {
            User.findOneAndUpdate({ "company": company._id }, { $set: req.body }).exec(function (err, user) {
                if (err) {
                    res.send(err);
                }
                User.findById(user._id).exec(function (err, user2) {
                    const token = jwt.sign({ data: user2 },
                        JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        });
                    res.send({
                        Message: 'Update token ',
                        access_token: token,
                    })

                })
            });
        }
    });
});
module.exports = router;