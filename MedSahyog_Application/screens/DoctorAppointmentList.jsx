import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

function DoctorAppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch the current user's doctor ID
        const response = await axios.get('http://10.24.85.158:5000/api/currentuserdoc');
        const doctorId = response.data._id;

        // Fetch appointments for the specific doctor
        const appointmentsResponse = await axios.get(`http://10.24.85.158:5000/api/appointmentslistd?doctorId=${doctorId}`);
        
        // Update date format to remove time zone
        const formattedAppointments = appointmentsResponse.data.map(appointment => {
          const date = new Date(appointment.date);
          const formattedDate = date.toISOString().split('T')[0];
          return { ...appointment, date: formattedDate };
        });

        setAppointments(formattedAppointments);
      } catch (error) {
        setError('Error fetching appointments');
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Doctor's Appointment List</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>Date</Text>
          <Text style={[styles.cell, styles.header]}>Time</Text>
          <Text style={[styles.cell, styles.header]}>Patient</Text>
        </View>
        {appointments.map((appointment, index) => (
          <View key={appointment._id} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={styles.cell}>{appointment.date}</Text>
            <Text style={styles.cell}>{appointment.time}</Text>
            <Text style={styles.cell}>{appointment.patientName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    color: '#333',
  },
});

export default DoctorAppointmentList;
