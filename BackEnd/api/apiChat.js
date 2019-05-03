var Chat = require('../models/chat');
var router = require('express').Router();

router.post('/addConversation', function(req, res) {
  var chat = new Chat(req.body);
  chat.save(function(err, conversation) {
    if (err) {
      res.send(err);
    }
    res.send(conversation);
  })
})

router.post('/addMsg/:id', function(req, res) {
  Chat.findById({_id: req.params.id}, function(err, privateChat) {
    if (err) {
      res.send(err);
    }
    privateChat.chat.push(req.body);
    Chat.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, function(err2, msg) {
      if (err2) {
        res.send(err2);
      }
      const io = req.app.get('io');
      io.emit('newMessageAdded');
    })
  })
})

router.get('/getChatById/:id', function(req, res) {
  Chat.findById({_id: req.params.id}, function(err, chat) {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

router.get('/getChatCompany/:companyChatterId', function(req, res) {
  Chat.find({_id: req.params.companyChatterId}, (err, chat) => {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

router.get('/getChatFreelancer/:freelancerChatterId', function(req, res) {
  Chat.find({chatterFreelancer: req.params.freelancerChatterId}, (err, chat) => {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

module.exports = router;
