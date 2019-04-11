var express = require('express');
var db = require('./database/db.js');
var bodyParser = require('body-parser');
var projectApi = require('./api/apiProject');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/projects', projectApi);

app.listen(3000, function() {console.log('listening to 3000')});
