var router = require('express').Router();
var Freelancer = require('../models/freeLancer');
var User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require("multer");
var passport = require('passport');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });


router.post('/addfree',upload.single('Image_Profil'), function (req, res) {
    motpass = req.body.password;
    var hash = bcrypt.hashSync(motpass, saltRounds);
    req.body.password = hash;
    req.body.Image_Profil = req.file.filename;
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

 router.get('/getCompany/:id',passport.authenticate('bearer', { session: false }), function (req, res) {
  var id = req.params.id;
  free.findById(id).populate('freelancers').exec((err, freelancers) => {
      if (err) {
          res.send(err);
      }
      res.send(freelancers);
  });
});

router.post('/updateFree/:id',passport.authenticate('bearer', { session: false }), function (req, res) {
  var id = req.params.id;
  free.findByIdAndUpdate({_id : id},{$set: req.body}).exec((err, freelancers) =>{
      if (err) {
          res.send(err);
      }
      res.send(freelancers);
  })
});

module.exports = router;