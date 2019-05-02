var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  chatterCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'company'},
  chatterFreelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'freelancer'},
  chat: [{
    message: String,
    sender: String,
    date: {type: Date, default: Date.now()}
  }]
})

module.exports = mongoose.model('chat', ChatSchema);
