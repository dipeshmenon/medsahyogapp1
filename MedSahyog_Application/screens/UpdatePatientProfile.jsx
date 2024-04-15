import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import BottomNavBar from './BottomNavbar';

const UpdatePatientProfile = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    phno: '',
    history: '',
    photo: null
  });

  useEffect(() => {
    // Fetch current patient details and populate the form
    // Example:
    // axios.get('http://192.168.1.3:5000/api/patient')
    //   .then(response => {
    //     setFormData({
    //       email: response.data.email,
    //       phno: response.data.phno,
    //       history: response.data.history
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error fetching patient details:', error);
    //   });
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setFormData({ ...formData, photo: result.uri });
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phno', formData.phno);
    formDataToSend.append('history', formData.history);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await axios.put('http://10.24.85.158:5000/api/patient', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
          
        }
      });
      await axios.put('http://10.24.85.158:5000/api/login1', { email: formData.email });
      // Optionally, handle successful update
    } catch (error) {
      console.error('Error updating patient details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Patient Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phno}
        onChangeText={(text) => handleChange('phno', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Medical History"
        multiline={true}
        numberOfLines={4}
        value={formData.history}
        onChangeText={(text) => handleChange('history', text)}
      />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#02D0C2',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdatePatientProfile;
