var express = require('express');
var Project = require('../models/project');
var Company =  require('../models/company');
var Freelancer = require('../models/freeLancer');
var router = express.Router();


router.post('/addProject/:companyId', async function(req, res) {
  var project = new Project(req.body);
  var company = new Company();
  company['_id'] = req.params.companyId;
  project.company = company;
  await project.save(function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('appliedFreelancers/:projectId/:freelancerId', async function(req, res) {
  var freelancer = new Freelancer();
  freelancer['_id'] = req.params.freelancerId;
  await Project.findByIdAndUpdate({_id: req.params.projectId}, {$push: {applied_freelancers: freelancer}}, function(err, project) {
    if (err) {
      res.send(err);
    }
    res.send(project);
  })
})

router.post('acceptedFreelancer/:projectId/:freelancerId', async function(req, res) {
  var project = new Project();
  var freelancer = new Freelancer();
  freelancer['_id'] = req.params.freelancerId;
  await project.findByIdAndUpdate({_id: req.params.projectId}, {accepted_freelancer: freelancer}, function(err, project) {
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
  await Project.findByIdAndRemove({_id: req.params.projectId}, req.body, function(err, project){
    if(err){
      res.send(err);
    }
    res.send(project);
  })
})


module.exports = router;
