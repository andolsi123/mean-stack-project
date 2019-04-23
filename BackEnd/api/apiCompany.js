var router = require('express').Router();
var Company = require('../models/company');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/user');
var passport = require('passport');
const multer = require("multer");



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  });

  var upload = multer({ storage: storage });
  router.post('/addCompany',upload.single('logo'), function (req, res) {
    motpass = req.body.Pword;
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

router.post('/update/:id'/*,passport.authenticate('bearer', { session: false })*/, function (req, res) {
    var id = req.params.id;
    Company.findByIdAndUpdate({_id : id},{$set: req.body}).exec((err, companies) =>{
        if (err) {
            console.log(err);
        }
        res.send(companies);
    })
});


module.exports = router;
