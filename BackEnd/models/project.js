var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  titre_project: String,
  description_project: String,
  skills: [{skill: String}],
  min_offer: String,
  max_offer: String,
  applied_freelancers: [{type: mongoose.Schema.Types.ObjectId, ref: 'freelancers'}],
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'companies'},
  accepted_freelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'freelancers'},
  statut: {type:String, enu:['started','finished','not started'], default:'not started'},
  duration: Number
});

module.exports = mongoose.model('projects', projectSchema);
