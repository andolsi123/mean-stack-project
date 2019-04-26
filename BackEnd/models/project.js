var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  titre_project: String,
  description_project: String,
  skills: [{skill: String}],
  min_offer: String,
  max_offer: String,
  applied_freelancers: [{type: mongoose.Schema.Types.ObjectId, ref: 'freelancer'}],
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'company'},
  accepted_freelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'freelancer'},
  statut: {type:String, enum:['started','finished','not started'], default:'not started'},
  duration: Number,
  like: {type: Number, default: 0}
});

module.exports = mongoose.model('projects', projectSchema);
