const _ = require('lodash')
const User = require('../models/UsersModel')

const UsersController = app => {

  // create / register
  app.post('/api/users', (req, res)=>{
    const newUser = new User(req.body)
    newUser.save()
    .then(()=>{
      res.send('user created')
    })
    .catch(err=>{
      console.error(err);
    })
  })

  // read
  app.get('/api/users', (req, res)=>{
    User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      console.error(err);
    })
  })

  // read
  app.get('/api/users/:id', (req, res)=>{
    User.find({ _id : req.params.id})
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err);
    })
  })

  // update
  app.put('/api/users/:id', (req, res)=>{
    User.update({ _id : req.params.id}, req.body)
    .then(res => {
      res.send('update success')
    })
    .catch(err => {
      console.error(err);
    })
  })

  // delete
  app.delete('/api/users/:id', (req, res)=>{
    User.remove({ _id : req.params.id })
    .then(()=> {
      res.send('delete success')
    })
    .catch(err => {
      console.error(err);
    })
  })

  // login
  app.post('/api/users/login', (req, res)=>{
    let req_body = req.body;
    let email_index = _.findIndex(_users, {
      email : req_body.email
    })

    if (email_index > -1) {
      if (_users[email_index].password == req_body.password) {
        // _users[email_index].token = new Date()
        _users[email_index].token = 123
        res.json(_users[email_index])
      } else {
        res.send('password salah')
      }
    } else {
      res.send('user kagak ada')
    }
  })

  // verify token
  app.post('/api/users/verify', (req, res)=>{
    let index = _.findIndex(_users, {
      token : parseInt(req.body.token)
    })

    if (index > -1) {
      res.send('verify okay')
    } else {
      res.send('verify gagal')
    }
  })

  // logout
  app.post('/api/users/logout', (req, res)=>{
    let index = _.findIndex(_users, {
      token : parseInt(req.body.token)
    })

    _users[index].token = null
    res.send('log out sukses')
  })

  // forgot-password
  app.post('/api/users/forgot-password', (req, res)=>{
    res.send('forgot-password')
  })
}

module.exports = UsersController
