
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true
  },
    gender: {
    type: String,
    required: true
  },
  phno: {
    type: Number,
    required: true
  },
  history: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer, // Storing binary data of the image
    contentType: String,
    
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
