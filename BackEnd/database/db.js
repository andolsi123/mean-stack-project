var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanProject', {useNewUrlParser: true}, (err) => {
  if (!err) {
    console.log('mongoDB connected');
  } else {
    console.log('Error in connection to mongoDB' + err);
  }
})
