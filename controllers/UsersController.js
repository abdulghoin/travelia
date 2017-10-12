const _ = require('lodash')

const Users = app => {
  let _users = []

  // create / register
  app.post('/api/users', (req, res)=>{
    _users.push(req.body)
    res.send('user created')
  })

  // read
  app.get('/api/users', (req, res)=>{
    res.send(_users)
  })

  // read
  app.get('/api/users/:id', (req, res)=>{
    let index = _.findIndex(_users, {
      id: parseInt(req.params.id)
    })
    res.send(_users[index])
  })

  // update
  app.put('/api/users/:id', (req, res)=>{
    let index = _.findIndex(_users, {
      id: parseInt(req.params.id)
    })
    // _.merge(_users[index], req.body)
    _users[index] = req.body
    res.send('user updated successfully')
  })

  // delete
  app.delete('/api/users/:id', (req, res)=>{
    _.remove(_users, user => {
      return user.id === parseInt(req.params.id)
    })
    res.send('user removed successfully')
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

module.exports = Users
