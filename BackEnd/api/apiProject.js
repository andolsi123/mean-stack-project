var express = require('express');
var Project = require('../models/project');
var router = express.Router();


router.post('/addProject', async function(req, res) {
  var project = new Project(req.body);
  await project.save(function(err, project) {
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

router.get('/allProjects/:id', async function(req, res) {
  await Project.find().exec(function(err, projects) {
    if (err) {
      res.send(err);
    }
    res.send(projects);
  })
})

router.get('/oneProject/:projectId', async function(req, res) {
  await Project.findById(req.params.projectId).populate('company').populate('accepted_freelancer').populate('pplied_freelancers').exec(function(err, project){
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
