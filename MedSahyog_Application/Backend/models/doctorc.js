

const mongoose = require('mongoose');

const doctorcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
    department: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  }
});

const Doctorc = mongoose.model('Doctorc', doctorcSchema);

module.exports = Doctorc;
