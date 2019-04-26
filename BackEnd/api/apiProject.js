var express = require('express');
var Project = require('../models/project');
var Company =  require('../models/company');
var Freelancer = require('../models/freeLancer');
//var ObjectID = require('mongoose').ObjectID;
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

router.get('/allProjectsCompany/:id', async function(req, res){
    var id = req.params.id;
    console.log(id);
  await Project.find({company:id}).exec(function(err, projects){
    if(err){
      res.send(err);
    }
    console.log(projects)
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
    Freelancer.findOne({liked_projects: req.params.projectId}, function(err, lk) {
      if (err) {
        res.send(err);
      }
      if (!lk) {
        lk.update({_id: req.params.freelancerId}, {$push: {liked_projects: req.params.projectId}}, done);
        project.like =+ 1;
        project.save();
      }
      project.like =- 1;
      project.save();
      lk.update({_id: req.params.freelancerId}, {$pull: {liked_projects: req.params.projectId}}, done);
    })
    res.send({like: project.like});
  })
})

module.exports = router;
