var Chat = require('../models/chat');
var router = require('express').Router();

router.post('/addMsg/:id', function(req, res) {
  const io = req.app.get('io');
  const chat = new Msg(req.body);
  chat.findByIdAndUpdate({_id: req.params.id}, {$push: {chat: req.body.chat}}, function(err, msg) {
    if (err) {
      res.send(err);
    }
    io.emit('newMessageAdded');
    res.send(msg);
  })
})

router.get('/getChatCompany/:companyChatterId', function(req, res) {
  Chat.findOne({chatterCompany: companyChatterId}, (err, chat) => {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

router.get('/getChatFreelancer/:freelancerChatterId', function(req, res) {
  Chat.findOne({chatterFreelancer: freelancerChatterId}, (err, chat) => {
    if (err) {
      res.send(err);
    }
    res.send(chat);
  })
})

module.exports = router;
