var mongoose = require('mongoose');

var FreeLancerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_Number: String,
    birthdate: String,
    rateWork: String,
    facebook: String,
    github: String,
    twitter: String,
    skills: [{skill: String}],
    languages: [{language: String}],
    portfolio: String,
    Image_Profil: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}],
    rating: [{
      company: {type: mongoose.Schema.Types.ObjectId, ref:'company'},
      rates: {type: Number}
    }]
})

module.exports = mongoose.model('freelancer', FreeLancerSchema);
