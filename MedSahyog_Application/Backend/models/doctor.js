
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
