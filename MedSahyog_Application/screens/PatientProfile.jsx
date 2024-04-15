import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PatientProfile = () => {
  const navigation = useNavigation();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://10.24.85.158:5000/api/patient');
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.put('http://10.24.85.158:5000/api/logout');
      // Optionally, perform any additional actions after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{patient ? patient.name : 'Loading...'}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.profileRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{patient ? patient.email : 'Loading...'}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.profileRow}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{patient ? patient.age : 'Loading...'}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.profileRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{patient ? patient.gender : 'Loading...'}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.profileRow}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{patient ? patient.phno : 'Loading...'}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.profileRow}>
            <Text style={styles.label}>Medical History:</Text>
            <Text style={styles.value}>{patient ? patient.history : 'Loading...'}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdatePatientProfile')}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02D0C2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  profileInfo: {},
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  horizontalLine: {
    borderBottomColor: '#02D0C2',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#bcf7f3',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#18403d',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default PatientProfile;
