import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '') {
        alert('Please enter your name');
        return;
      }
    
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Email validation
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
    
      // Gender validation
      if (gender === '') {
        alert('Please select your gender');
        return;
      }
    
       // Contact number validation
  if (contactNo.trim() === '' || !/^\d{10}$/.test(contactNo)) {
    alert('Please enter a valid contact number with exactly 10 digits');
    return;
  }
    // Add your registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Gender:', gender);
    console.log('Contact No:', contactNo);
  };

  return (
    <View style={styles.container}>
       <Image source={require('../assets/Logo02.png')} style={styles.logo} />
       <View style={styles.card}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Enter name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender:</Text>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Male' && styles.selectedOption]}
          onPress={() => setGender('Male')}
        >
          <Text style={styles.genderOptionText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Female' && styles.selectedOption]}
          onPress={() => setGender('Female')}
        >
          <Text style={styles.genderOptionText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Others' && styles.selectedOption]}
          onPress={() => setGender('Others')}
        >
          <Text style={styles.genderOptionText}>Others</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Enter contact number"
        style={styles.input}
        value={contactNo}
        onChangeText={setContactNo}
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: -100,
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ade0d6'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 70,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  genderLabel: {
    marginRight: 10,
  },
  genderOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 10,
  },
  genderOptionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#02D0C2',
  },
  button: {
    width: '60%',
    backgroundColor: '#02D0C2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Card background color with slight transparency
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 2, // Shadow for Android devices
  }
});

export default Register;
