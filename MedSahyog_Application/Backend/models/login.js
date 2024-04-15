
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  userselect:{
    type: Boolean,
    requried:true
  }
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
