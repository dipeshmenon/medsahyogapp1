import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Patient');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.24.85.158:5000/api/loginn', {
        email,
        password,
        type
      });

      if (response.data.success) {
        // Navigate based on user type
        
        if (type === 'Patient') {
          navigation.navigate('PatientHomeScreen');
        } 
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo02.png')} style={styles.logo} />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Medsahyog</Text>
        {/* Your identity selection buttons here */}
        <TextInput
          placeholder="Enter email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa" // Placeholder text color
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa" // Placeholder text color
        />
        {/* Your identity selection buttons here */}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ade0d6', // Background color for the entire screen
  },
  logo: {
    marginTop: -100,
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Card background color with slight transparency
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    elevation: 2, // Shadow for Android devices
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width:'70%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 30,
    borderColor: '#02D0C2', 
    borderWidth: 1,
    color: '#333', 
  },
  button: {
    width: '80%',
    backgroundColor: '#02D0C2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
