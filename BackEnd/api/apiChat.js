var Chat = require('../models/chat');
var router = require('express').Router();

router.post('/addMsg/:id', function(req, res) {
  console.log(req.body.chat);
  Chat.findById({_id: req.params.id}, function(err, privateChat) {
    if (err) {
      res.send(err);
    }
    privateChat.chat.push(req.body.chat);
    Chat.findByIdAndUpdate({_id: req.params.id}, {$set: {chat: privateChat.chat}}, function(err2, msg) {
      if (err2) {
        res.send(err2);
      }
      const io = req.app.get('io');
      io.emit('newMessageAdded');
    });


  })
})

router.get('/getChatCompany/:companyChatterId', function(req, res) {
  Chat.findOne({_id: req.params.companyChatterId}, (err, chat) => {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

router.get('/getChatFreelancer/:freelancerChatterId', function(req, res) {
  Chat.findOne({chatterFreelancer: req.params.freelancerChatterId}, (err, chat) => {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

module.exports = router;
