var mongoose = require('mongoose');

var FreeLancerSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    phone_Number:String,
     birthdate:String,
    rateWork:String,
    facebook:String,
    githup:String,
    twitter:String,
    skils:[{skil:String}],
    languages:[{language:String}],
    portfolio:String,
    Image_Profil:String,
    projects:[{type:mongoose.Schema.Types.ObjectId,ref:'project'}]
});


module.exports = mongoose.model('freelancer',FreeLancerSchema);