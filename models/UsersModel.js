const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema

const userSchema = new Schema({
  first_name : {
    type : String,
    trim : true,
    required : true
  },
  last_name : {
    type : String,
    trim : true,
    required : true
  },
  email : {
    type : String,
    trim : true,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  access_token : {
    type : String,
    default : ''
  },
  created_at : {
    type : Date,
    default : Date.now
  },
  updated_at : {
    type : Date,
    default : ''
  }
})

module.exports = mongoose.model('User', userSchema)
