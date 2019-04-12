var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    nameCompany:String,
    address:String,
    foundyear:String,
    phoneNumber:String,
    DescriptionCompany:String,
    facebook:String,
    webSite:String,
    linkedin:String,
    logo:String
});


module.exports = mongoose.model('company',CompanySchema);