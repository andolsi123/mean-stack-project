var router = require('express').Router();
var Freelancer = require('../models/freeLancer');
var User = require('../models/user');
var Project = require('../models/project');
var Company = require('../models/company');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require("multer");
var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var ObjectID = mongoose.Types.ObjectId;
var mailer = require("nodemailer");
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2';
var Project = require('../models/project');

var transporter = mailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: false,
  auth: {
    user: "andolsiayoub@gmail.com",
    pass: "******"
  },
  tls: {
    rejectUnauthorized: false
  }
})

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

router.post('/addfree', upload.single('Image_Profil'), async function (req, res) {
  motpass = req.body.password;
  var hash = bcrypt.hashSync(motpass, saltRounds);
  req.body.password = hash;
  req.body.Image_Profil = req.file.filename;
  var free = new Freelancer(req.body);
  await free.save(function (err, freelancer) {
    if (err) {
      res.send(err);
    }
    var user = new User(req.body);
    user.freelancer = freelancer._id;
    user.save(async function (err, user) {
      if (err) {
        res.send(err);
      }
      var mail = {
        from: "ADMIN AYOUB <andolsiayoub@gmail.com>",
        to: user.email,
        subject: "Your account has been created succefully !!",
        text: `Welcome ${free.first_name} ${free.last_name} to our WEB APP hope you enjoy your time here !!`,
        html: `<b>Welcome ${free.first_name} ${free.last_name} to our WEB APP hope you enjoy your time here !!</b>`
      }
      await transporter.sendMail(mail, function(error, response) {
        if (error) {
          console.log("email error: " + error);
        } else {
          console.log("Message sent: " + response.message);
        }
        transporter.close();
      })
      res.send(user);
    })
  })
 })

router.post('/addProjectApplied/:freelancerId/:projectId', async function(req, res) {
  var prjct = {project: req.params.projectId, statut: 'Pending'};
  await Freelancer.findByIdAndUpdate({_id: req.params.freelancerId}, {$push: {projects: prjct}}, async function(err, freelancer) {
    if (err) {
      res.send(err);
    }
    await Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {applied_freelancers: req.params.freelancerId}}, function(error2, prjct) {
      if (error2) {
        console.log(error2);
      }
      console.log(prjct);
    })
  })
})

router.post('/refusedFreelancer/:freelancerId/:projectId', async function(req, res) {
  await Freelancer.findByIdAndUpdate({_id: req.params.freelancerId}, {$pull: {projects: {project: req.params.projectId}}}, async function(err, freelancer) {
    if (err) {
      res.send(err);
    }
    await Project.findByIdAndUpdate({_id: req.params.projectId}, {$pull: {applied_freelancers: req.params.freelancerId}}, function(err2, project) {
      if (err2) {
        res.send(err2);
      }
    })
  })
})

router.get('/getFreelancer/:id', passport.authenticate('bearer', { session: false }),async function (req, res) {
  var id = ObjectID(req.params.id);
  await Freelancer.findById(id).populate({path:'projects.project', populate: { path: 'company', model: 'company'}}).exec((err, freelancer) => {
    if (err) {
      res.send(err);
    }
  res.send(freelancer);
  })
})

router.post('/addChangeRating/:freelancerId', async function(req, res) {
  await Freelancer.findByIdAndUpdate({_id: req.params.freelancerId}, {$set: {rating: req.body}}, function(err, rating) {
    if (err) {
      res.send(err);
    }
    res.send(rating.rating);
  })
})

router.get('/allfreelancers', async function(req, res) {
  await Freelancer.find().exec(function(err, freelancer) {
    if (err) {
      res.send(err);
    }
    res.send(freelancer);
  })
})

router.post('/updateFreelancerProfil/:id', passport.authenticate('bearer', {session: false}), upload.single('Image_Profil'), async function (req, res) {
  var id = req.params.id;
  req.body.Image_Profil = req.file.filename;
 await Freelancer.findByIdAndUpdate({ "_id": id }, { $set: req.body }).exec( async function (err, freelancer) {
      if (err) {
          res.send(err)
      }
      else {
         await User.findOneAndUpdate({ "freelancer": freelancer._id }, { $set: req.body }).exec(async function (err2, user) {
              if (err2) {
                  res.send(err2);
              }
              else {
              await User.findById(user._id).exec(async function (err3, user2) {
                if(err3) {
                  res.send(err3)
                }
                else {
                 const token = jwt.sign({ data: user2 },
                   JWT_SIGN_SECRET, {
                       expiresIn: '1h'
                   })
               res.send({ access_token: token})
                }
               })
              }
          })
      }
  })
})

router.post('/updateFreelancerLists/:id', passport.authenticate('bearer', {session: false}), async function (req, res) {
  var id = req.params.id;
 await Freelancer.findByIdAndUpdate({ "_id": id }, { $set: req.body }).exec( async function (err, freelancer) {
      if (err) {
          res.send(err)
      }
      else {
         await User.findOneAndUpdate({ "freelancer": freelancer._id }, { $set: req.body }).exec(async function (err2, user) {
              if (err2) {
                  res.send(err2);
              }
              else {
              await User.findById(user._id).exec(async function (err3, user2) {
                if(err3) {
                  res.send(err3)
                }
                else {
                 const token = jwt.sign({ data: user2 },
                   JWT_SIGN_SECRET, {
                       expiresIn: '1h'
                   })
               res.send({ access_token: token})
                }
               })
              }
          })
      }
  })
})

router.post('/updateFreelancerCv/:id', passport.authenticate('bearer', {session: false}), upload.single('portfolio'), async function (req, res) {
  var id = req.params.id;
  req.body.portfolio = req.file.filename;
  await Freelancer.findByIdAndUpdate({ "_id": id }, { $set: req.body }).exec( async function (err, freelancer) {
    if (err) {
      res.send(err)
    }
    else {
      await User.findOneAndUpdate({ "freelancer": freelancer._id }, { $set: req.body }).exec(async function (err2, user) {
        if (err2) {
          res.send(err2);
        }
        else {
          await User.findById(user._id).exec(async function (err3, user2) {
            if(err3) {
              res.send(err3)
            }
          else {
            const token = jwt.sign({ data: user2 },
              JWT_SIGN_SECRET, {
              expiresIn: '1h'
            })
            res.send({ access_token: token})
          }
        })
      }
      })
    }
  })
})

module.exports = router;
