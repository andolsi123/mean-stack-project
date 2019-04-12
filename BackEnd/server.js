var express = require('express');
var db = require('./database/db.js');
var bodyParser = require('body-parser');
var projectApi = require('./api/apiProject');
var app = express();
var companyCrud = require('./api/apiCompany');
var freelancerCrud = require('./api/apiFreeLancer');
var userCrud = require('./api/apiUser');
var passport = require('./passport/passport');
var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/projects', projectApi);
app.use(cors());
app.use('/companies',companyCrud);
app.use('/freelancers',freelancerCrud);
app.use('/users',userCrud);

app.listen(3000, function() {console.log('listening to 3000')});
