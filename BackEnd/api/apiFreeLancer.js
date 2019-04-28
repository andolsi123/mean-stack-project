var router = require('express').Router();
var Freelancer = require('../models/freeLancer');
var User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require("multer");
var passport = require('passport');
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

router.post('/addfree', upload.single('Image_Profil'), function (req, res) {
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

router.post('/addProjectApplied/:freelancerId/:projectId', function(req, res) {
  var prjct = {project: req.params.projectId, statut: 'Pending'};
  Freelancer.findByIdAndUpdate({_id: req.params.freelancerId}, {$push: {projects: prjct}}, function(err, freelancer) {
    if (err) {
      res.send(err);
    }
    res.send(freelancer);
  })
})

 router.get('/getFreelancer/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
  var id = ObjectID(req.params.id);
  Freelancer.findById(id).exec((err, freelancer) => {
      if (err) {
        res.send(err);
      }
      res.send(freelancer);
  });
});

router.post('/addChangeRating/:freelancerId', function(req, res) {
  Freelancer.findByIdAndUpdate({_id: req.params.freelancerId}, {$set: {rating: req.body}}, function(err, rating) {
    if (err) {
      res.send(err);
    }
    res.send(rating.rating);
  })
})

module.exports = router;
