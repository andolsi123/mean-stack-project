var express = require('express');
var Project = require('../models/project');
var Company =  require('../models/company');
var Freelancer = require('../models/freeLancer');
var router = express.Router();
var objectId = require('mongoose').objectId;

router.post('/addProject', async function(req, res) {
  var project = new Project(req.body);
  await project.save(function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('/appliedFreelancers/:projectId/:freelancerId', async function(req, res) {
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {applied_freelancers: req.params.freelancerId}}, function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('/acceptedFreelancer/:projectId/:freelancerId', async function(req, res) {
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$set: {accepted_freelancer: req.params.freelancerId}}, function(err, project) {
    if (err) {
      res.send(err);
    }
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

router.post('/addRemoveLike/:projectId/:freelancerId', function(req, res) {
   Project.findById(req.params.projectId,  function(err, project) {
    if (err) {
      res.send(err);
    }
    let verif = false;
    for (freelancer of project.freelancers_likes) {
      if (freelancer == req.params.freelancerId) {
        verif = true;

      }
    }
    if(verif === true) {
      project.like -= 1;
      Project.findByIdAndUpdate({_id: req.params.projectId}, {$pull: {freelancers_likes: req.params.freelancerId}}, function(errr, upd) {
        if (errr) {
          res.send(errr);
        }
        res.send(upd);
      });
    } else {
      project.like += 1;
      Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {freelancers_likes: req.params.freelancerId}}, function(errrr, dlt) {
        if (errrr) {
          res.send(errrr);
        }
        res.send(dlt);
      })
    }
  })
})

router.post('/addComment/:projectId', function(req, res) {
  Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {comments: req.body}}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.send(comment);
    console.log(req.body);
  })
})

router.post('/deleteComment/:projectId/:commentId', function(req, res) {
  Project.findByIdAndUpdate({_id: req.params.projectId}, {$pull: {comments: {_id: req.params.commentId}}}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.send(comment);
  })
})

module.exports = router;
