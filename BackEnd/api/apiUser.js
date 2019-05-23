var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Company = require('../models/company');
var freelancer = require('../models/freeLancer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2';
var auth = require('../auth/auth').authenticate;

router.post('/login', function (req, res) {
  var email = req.body.email;
  User.findOne({ email: email }).exec((err, users) => {
    if (err) {
      res.send(err);
    }
    if (!users) {
      res.send('wrong email')
    }
    if (bcrypt.compareSync(req.body.password, users.password)) {
      let token = jwt.sign({data: users}, JWT_SIGN_SECRET, {expiresIn: '1h'});
      res.send({
        success: true,
        message: 'Authentication successful!',
        access_token: token,
      })
    } else {
      res.send('wrong password');
    }
  })
})

router.get('/image/:name', async (req, res) => {
  await res.sendFile('C:\\Users\\user16\\Desktop\\mean-stack-project-master\\BackEnd\\uploads\\'+ req.params.name);
})

module.exports = router;
