const _ = require('lodash'),
      jwt = require('jsonwebtoken');
      bcrypt = require('bcrypt'),
      User = require('../models/UsersModel')

// create / register
const register = (req, res) => {
  const newUser = new User(req.body)
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save()
  .then( user =>{
    res.json(user)
  })
  .catch(err=>{
    res.json(err)
  })
}

// read
const getUsers = (req, res) => {
  User.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(500).json({ message : 'Internal Server Error.'})
  })
}

// read
const getUser = (req, res) =>{
  User.findOne({ _id : req.params.id})
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({ message : 'Internal Server Error.'})
  })
}

// update
const updateUser = (req, res) => {
  User.update({ _id : req.params.id}, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.json(err)
  })
}

// delete
const deleteUser = (req, res) => {
  User.remove({ _id : req.params.id })
  .then(()=> {
    res.status(200).json({ message : 'delete success.'})
  })
  .catch(err => {
    res.status(500).json({ message : 'Internal Server Error.'})
  })
}

// login
const login = (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    let error = [
      {
        error_label : 'email',
        error_message : 'E-Mail is required.'
      },
      {
        error_label : 'password',
        error_message : 'Password is required.'
      }
    ]
    res.status(402).json(error)
  }
  let email = req.body.email
  let password = req.body.password

  if (email !== '' && password !== '') {
    User.findOne({ email : email })
    .then( user => {
      if (bcrypt.compareSync(password, user.password)) {
        let access_token = jwt.sign({ email: user.email, first_name: user.first_name, last_name: user.last_name, _id: user._id}, 'RESTFULAPIs')
        user.access_token = access_token
        console.log(user);
        User.update({ _id : user._id}, user)
        .then(() => {
          res.json(user)
        })
        .catch(() => {
          res.status(500).json({ error_message : 'Internal Server Error.'})
        })
      } else {
        let error = []
        error.push({
          error_label : 'password',
          error_message : 'Wrong password.'
        })
        res.status(401).json(error)
      }
    })
    .catch(() => {
      let error = []
      error.push({
        error_label : 'email',
        error_message : 'User not found.'
      })
      res.status(404).json(error)
    })
  } else {
    let error = []
    console.log(email);
    console.log(password);
    if (email == '' || email == undefined) {
      error.push({
        error_label : 'email',
        error_message : 'E-Mail is required.'
      })
    }
    if (password == '' || password == undefined) {
      error.push({
        error_label : 'password',
        error_message : 'Password is required.'
      })
    }

    res.status(402).json(error)
  }
}

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

// verify token
const verify = (req, res) => {
  User.findOne({ _id : req.user._id})
  .then( user => {
    res.status(200).json(user)
  })
  .catch(() => {
    res.status(500).json({ message : 'Internal Server Error.'})
  })
}

// logout
const logout = (req, res) => {
  User.findOne({ _id : req.user._id })
  .then( user => {
    user.access_token = ''
    User.update({ _id : user._id}, user)
    .then(() => {
      res.status(200).json({ message : 'Logout success.'})
    })
    .catch(() => {
      res.status(500).json({ error_message : 'Internal Server Error.'})
    })
  })
  .catch(() => {
    res.status(500).json({ error_message : 'Internal Server Error.'})
  })
}

// forgot-password
const forgotPassword = (req, res) => {
  // res.json(req.headers)
  res.send('forgot-password')
}

module.exports = {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  loginRequired,
  verify,
  logout,
  forgotPassword
}
