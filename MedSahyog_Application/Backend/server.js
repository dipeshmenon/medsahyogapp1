// server.js
const express = require('express');
const mongoose = require('mongoose');
const Appointment = require('./models/appointment');
const Department = require('./models/department');
const Doctor= require('./models/doctor');
const Doctorc= require('./models/doctorc');
const Patient= require('./models/patient');
const Login =require ('./models/login');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); 
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage: storage });
const app = express();
const axios = require('axios');

 
app.use(cors({
  origin: '*'
}));
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dipeshmenon:CcrmLZcHp57tTZaF@cluster0.ci1fkno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.post('/api/appointments', async (req, res) => {
  const { date, time, doctor } = req.body;
  if (!date || !time || !doctor) {
    return res.status(400).json({ message: 'Date, time, and doctor are required parameters' });
  }

  try {
    // Fetch the currently logged-in patient
    const loginUserResponse = await axios.get('http://localhost:5000/api/currentuserpat');
    const loginUser = loginUserResponse.data;
    
    if (!loginUser) {
      return res.status(400).json({ message: 'No logged-in patient found' });
    }

    // Create a new appointment with the patient ID
    const appointment = new Appointment({ date, time, doctor, patient: loginUser._id });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/appointments', async (req, res) => {
  const { date, doctor } = req.query;
  if (!date || !doctor) {
      return res.status(400).json({ message: 'Date and doctor are required parameters' });
  }

  try {
      const appointments = await Appointment.find({ date, doctor });
      res.json(appointments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.get('/api/appointments', async (req, res) => {
  try {
      // Get the patient ID from the request
      const patientId = req.query.patientId;
      if (!patientId) {
          return res.status(400).json({ message: 'Patient ID is required' });
      }

      // Query the appointments collection for appointments associated with the patient ID
      const appointments = await Appointment.find({ patient: patientId });
      res.json(appointments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.get('/api/appointmentslist', async (req, res) => {
  try {
      // Get the patient ID from the request
      const patientId = req.query.patientId;
      if (!patientId) {
          return res.status(400).json({ message: 'Patient ID is required' });
      }

      // Query the appointments collection for appointments associated with the patient ID
      const appointments = await Appointment.find({ patient: patientId });
      res.json(appointments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.get('/api/appointmentslistd', async (req, res) => {
  try {
      // Get the patient ID from the request
      const doctorId = req.query.doctorId;
      if (!doctorId) {
          return res.status(400).json({ message: 'doctor ID is required' });
      }

      // Query the appointments collection for appointments associated with the patient ID
      const appointments = await Appointment.find({ doctor: doctorId });
      res.json(appointments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.get('/api/currentuserpat', async (req, res) => {
  try {
    // Query MongoDB to get the currently logged-in patient
    const loginUser = await Login.findOne({ userselect: true });
    if (!loginUser) {
      return res.status(404).json({ message: 'No patient found with userType = true' });
    }

    // Find the patient using the email associated with the logged-in user
    const patient = await Patient.findOne({ email: loginUser.email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient details not found' });
    }

    // Return the patient's ID in the response
    res.status(200).json(patient); // Changed to return the entire patient object
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/currentuserdoc', async (req, res) => {
  try {
    // Query MongoDB to get the currently logged-in patient
    const loginUser = await Login.findOne({ userselect: true });
    if (!loginUser) {
      return res.status(404).json({ message: 'No patient found with userType = true' });
    }

    // Find the patient using the email associated with the logged-in user
    const doctorc = await Doctorc.findOne({ email: loginUser.email });
    if (!doctorc) {
      return res.status(404).json({ message: 'Doctor details not found' });
    }

    // Return the patient's ID in the response
    res.status(200).json(doctorc); // Changed to return the entire patient object
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// app.get('/api/appointments/:date', async (req, res) => {
//   try {
//       const { date } = req.params;
//       const existingAppointment = await Appointment.findOne({ date });
//       res.status(200).json({ exists: !!existingAppointment });
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });



  app.post('/api/departments', async (req, res) => {
    try {
      const { name, description } = req.body;
      const newDepartment = new Department({ name, description });
      await newDepartment.save();
      res.status(201).json({ message: 'Department added successfully' });
    } catch (error) {
      console.error('Error adding department:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  //get department

  app.get('/api/departments', async (req, res) => {
    try {
      const departments = await Department.find();
      res.json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
 
  //delete department

  app.delete('/api/departments/:id', async (req, res) => {
    const departmentId = req.params.id;
  
    try {
      // Attempt to find the department by ID and delete it
      const deletedDepartment = await Department.findByIdAndDelete(departmentId);
      
      if (deletedDepartment) {
        res.status(200).json({ message: 'Department deleted successfully' });
      } else {
        // If no department was found with the given ID
        res.status(404).json({ message: 'Department not found' });
      }
    } catch (error) {
      // If an error occurred during the deletion process
      console.error('Error deleting department:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.post('/api/doctors', async (req, res) => {
    try {
      const { name, email, password, qualification, department, experience } = req.body;
      const newDoctor = new Doctor({ name, email, password, qualification, department, experience });
      await newDoctor.save();
      res.status(201).json(newDoctor);
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/api/doctors', async (req, res) => {
    try {
      // Query MongoDB to get all doctors
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/api/doctorsappt', async (req, res) => {
    const departmentName = req.query.department;
    if (!departmentName) {
        return res.status(400).json({ message: 'Department name is required' });
    }

    try {
        const doctors = await Doctorc.find({ department: departmentName }, '_id name');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
  app.delete('/api/doctors/:id', async (req, res) => {
    try {
        const doctorId = req.params.id;

        // Find the doctor by ID and delete it
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({ message: 'Doctor deleted successfully', deletedDoctor });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
  app.post('/api/doctorc', async (req, res) => {
    try {
      const { name, email, password, qualification, department, experience } = req.body;
      const newDoctorc = new Doctorc({ name, email, password, qualification, department, experience });
      await newDoctorc.save();
      res.status(201).json(newDoctorc);
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // app.get('/api/doctorc', async (req, res) => {
  //   try {
  //     // Query MongoDB to get all doctors
  //     const doctorc = await Doctorc.find();
  //     res.status(200).json(doctorc);
  //   } catch (error) {
  //     console.error('Error fetching doctors:', error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // });
  app.get('/api/doctorc', async (req, res) => {
    try {
      const loginUser = await Login.findOne({ userselect: true });
      if (!loginUser) {
        return res.status(404).json({ message: 'No doctor found with userType = true' });
      }
  
      const doctor = await Doctorc.findOne({ email: loginUser.email });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor details not found' });
      }
  
      res.json(doctor);
    } catch (err) {
      console.error('Error fetching doctor details:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.get('/api/patient', async (req, res) => {
    try {
      // Query MongoDB to get all doctors
      const loginUser = await Login.findOne({userselect:true});
      if (!loginUser) {
        return res.status(404).json({ message: 'No patient found with userType = true' });
      }
  
      const patient = await Patient.findOne({ email: loginUser.email });
      if (!patient) {
        return res.status(404).json({ message: 'patient details not found' });
      }
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/patient', async (req, res) => {
    try {
      const { name, email, password, age, gender, phno, history} = req.body;
      const newPatient = new Patient({ name, email, password, age, gender, phno, history });
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error adding patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/patient', upload.single('photo'), async (req, res) => {
    try {
      // Check if photo was uploaded
      let photoData = null;
      if (req.file) {
        photoData = req.file.buffer; // Save the file buffer to the database
      }
  
      // Find the currently logged-in user
      const loginUser = await Login.findOne({ userselect: true });
  
      if (!loginUser) {
        return res.status(404).json({ message: 'No patient found with userType = true' });
      }
  
      // Find the patient details based on the logged-in user's email
      const patient = await Patient.findOne({ email: loginUser.email });
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient details not found' });
      }
  
      // Update patient details
  
      // Update email, phno, and history fields if provided
      if (req.body.email) {
        patient.email = req.body.email;
      }
      if (req.body.phno) {
        patient.phno = req.body.phno;
      }
      if (req.body.history) {
        patient.history = req.body.history;
      }
  
      // Update photo field with binary data if photo was uploaded
      if (photoData) {
        patient.photo = photoData;
      }
  
      // Save the updated patient
      const updatedPatient = await patient.save();
  
      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error('Error updating patient details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

  
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password,type, userselect} = req.body;
      const newLogin = new Login({ email, password,type, userselect });
      await newLogin.save();
      res.status(201).json(newLogin);
    } catch (error) {
      console.error('Error logging:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/api/login', async (req, res) => {
    try {
      // Query MongoDB to get all doctors
      const login = await Login.find();
      res.status(200).json(login);
    } catch (error) {
      console.error('Error logging', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.put('/api/logout', async (req, res) => {
    try {
      const loginUser = await Login.findOneAndUpdate({ userselect: true }, { userselect: false });
      res.json({ message: 'User logged out successfully' });
    } catch (err) {
      console.error('Error logging out user:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.put('/api/login1', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the record where userselect is true
      const loginRecord = await Login.findOne({ userselect: true });
  
      if (!loginRecord) {
        return res.status(404).json({ error: 'No record found with userselect set to true' });
      }
  
      // Update the email field
      loginRecord.email = email;
      await loginRecord.save();
  
      res.status(200).json({ message: 'Login details updated successfully' });
    } catch (error) {
      console.error('Error updating login details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/api/loginn', async (req, res) => {
    const { email, password, type } = req.body;
  
    try {
      // Check if a user with the provided email, password, and type exists in the Login collection
      const user = await Login.findOne({ email, password, type });
  
      if (user) {
        // Update the user's userselect to true (assuming you have this field in your model)
        await Login.updateOne({ email, type }, { userselect: true });
  
        // Return success response
        return res.json({ success: true });
      } else {
        // Return failure response if user not found or password incorrect
        return res.json({ success: false });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
