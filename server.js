const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      User = require('./models/UsersModel'),
      jwt = require("jsonwebtoken"),
      path = require('path'),
      PORT = process.env.PORT || 3030

// set up connection to database
mongoose.connect('mongodb://admin:admin@ds117965.mlab.com:17965/travelia', {
  useMongoClient : true
})
mongoose.Promise = global.Promise

// Create our app
const app = express()
app.use(bodyParser.json())

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use((req, res, next)=>{
  if (req.header['x-forwarded-proto'] === 'https') {
    res.redirect('http://'+ req.hostname + req.url);
  } else {
    next();
  }
})
app.use(express.static('src'))
app.use((req, res, next)=>{
  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
  //   jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {

  let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  User.findOne({ access_token : token })
  .then( user => {
    console.log(user);
    jwt.verify(token, 'RESTFULAPIs', (err, decode) => {
      if (err) {
        req.user = undefined
      } else {
        req.user = user
      }
      next()
    })
  })
  .catch(() => {
    req.user = undefined
    next()
  })
})

// routes
const routes = require('./routes')(app)

// setting up server
app.listen(PORT, ()=>{
  console.log('Server is up on port ' + PORT);
});
