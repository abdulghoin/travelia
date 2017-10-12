const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3030


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

// route and controllers
const Users = require('./controllers/UsersController')(app)
const Travels = require('./controllers/TravelsController')(app)

// run app
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

// setting up server
app.listen(PORT, ()=>{
  console.log('Server is up on port ' + PORT);
});
