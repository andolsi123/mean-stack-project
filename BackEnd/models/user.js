var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
email:String,
password:String,
role:{type:String,enum:['freelancer','company']},
freelancer:{type:mongoose.Schema.Types.ObjectId,ref:'freelancer'},
company:{type:mongoose.Schema.Types.ObjectId,ref:'company'}
});


module.exports = mongoose.model('user', UserSchema);