var express = require('express');
var Project = require('../models/project');
var router = express.Router();
var mailer = require("nodemailer");
var User = require('../models/user');
var Company = require('../models/company');

var transporter = mailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: false,
  auth: {
      user: "andolsiayoub@gmail.com",
      pass: "wxcv1234"
  },
  tls: {
    rejectUnauthorized: false
  }
})

router.post('/addProject', async function(req, res) {
  var project = new Project(req.body);
  await project.save(function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('/appliedFreelancers/:projectId/:freelancerId/:companyId', async function(req, res) {
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {applied_freelancers: req.params.freelancerId}}, async function(err, project) {
    if (err) {
      res.send(err);
    }
    var mail = {
      from: "ADMIN AYOUB <andolsiayoub@gmail.com>",
      to: req.body.companyEmail,
      subject: `A freelancer has submitted to one of your project`,
      text: `You have a new submission from ${req.body.freelancer} to your project \"<strong>${project.titre_project}</strong>\" check him out for more information`,
      html: `<b>You have a new submission from ${req.body.freelancer} to your project \"<strong>${project.titre_project}</strong>\" check him out for more information</b>`
    };
    await transporter.sendMail(mail, function(error, response) {
      if (error) {
        console.log("email error: " + error);
      } else {
        console.log("Message sent: " + response.message);
      }
      transporter.close();
    })
    Company.findByIdAndUpdate({_id: req.params.companyId}, {$push: {notifications: req.body.notifications}}, function(err2, com) {
      if (err2) {
        res.send(err2);
      }
      const io = req.app.get('io');
      io.emit('newNotificationAdded');
    })
    Company.findById({_id: req.params.companyId}, function(err3, com2) {
      if (err3) {
        res.send(err3);
      }
      const io = req.app.get('io');
      io.emit('newNotificationAdded');
      com2.notificationsNumber++;
      com2.save();
    })
    res.send(project);
  })
})

router.post('/acceptedFreelancer/:projectId/:freelancerId', async function(req, res) {
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$set: {accepted_freelancer: req.params.freelancerId}}, function(err, project) {
    if (err) {
      res.send(err);
    }
    User.findOne({freelancer: req.params.freelancerId}, async function(err, freelancer) {
      var mail = {
        from: "ADMIN AYOUB <andolsiayoub@gmail.com>",
        to: freelancer.email,
        subject: `Congratulations your submission to the project <strong>\"${project.titre_project}\"</strong> has been accepted`,
        text: `Do your best you have ${project.duration} days to finish the project.`,
        html: `<b>Do your best you have ${project.duration} days to finish the project.</b>`
      }
      await transporter.sendMail(mail, function(error, response) {
        if (error) {
          console.log("email error: " + error);
        } else {
          console.log("Message sent: " + response.message);
        }
        transporter.close();
      })
    })
    res.send(project);
  })
})

router.post('/updateProject/:projectId', async function(req, res) {
  await Project.findByIdAndUpdate({_id: req.params.projectId}, req.body, function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.get('/allProjectsCompany/:id', async function(req, res){
  var id = req.params.id;
  await Project.find({company:id}).exec(function(err, projects){
    if(err){
      res.send(err);
    }
    res.send(projects);
  })
})

router.get('/allProjects', async function(req, res) {
  await Project.find().populate('company').populate('accepted_freelancer').populate('applied_freelancers').exec(function(err, projects) {
    if (err) {
      res.send(err);
    }
    res.send(projects);
  })
})

router.get('/oneProject/:projectId', async function(req, res) {
  await Project.findById({_id: req.params.projectId}).populate('company').populate('accepted_freelancer').populate('applied_freelancers').exec(function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('/DeleteProject/:projectId', async function(req, res){
  await Project.findByIdAndRemove({_id: req.params.projectId}, function(err, project){
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('/addRemoveLike/:projectId/:freelancerId', async function(req, res) {
  await Project.findById(req.params.projectId, function(err, project) {
    if (err) {
      res.send(err);
    }
    var likes = project.like;
    if (project.freelancers_likes.length == 0) {
      project.like += 1;
      project.save(function(error) {if (error) {console.log(error);}});
      Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {freelancers_likes: req.params.freelancerId}}, function(errrrr, dlt) {
        if (errrrr) {
          console.log(errrrr);
        }
      })
    }
    for (let freelancer of project.freelancers_likes) {
      if (freelancer == req.params.freelancerId) {
        likes = likes - 1;
        Project.findByIdAndUpdate({_id: req.params.projectId}, {$pull: {freelancers_likes: req.params.freelancerId}, like: likes}, function(errr, upd) {
          if (errr) {
            console.log(errr);
          }
        })
      } else {
        likes++;
        Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {freelancers_likes: req.params.freelancerId}, like: likes}, function(errrr, dlt) {
          if (errrr) {
            console.log(errrr);
          }
        })
      }
    }
    res.send(project);
  })
})

router.post('/addComment/:projectId', async function(req, res) {
  var body = req.body;
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$set: {comments: body}}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.send(comment);
  })
})

router.post('/deleteComment/:projectId/:commentId', async function(req, res) {
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$pull: {comments: {_id: req.params.commentId}}}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.send(comment);
  })
})

router.post('/updateComment/:projectId/:commentId', function(req, res) {
  Project.findByIdAndUpdate({_id: req.params.projectId}, {$set: {comments: req.body}}, function(err, project) {
    if (err)  {
      res.send(err);
    }
    res.send(project);
  })
})

module.exports = router;
