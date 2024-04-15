const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
 
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctorc', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
