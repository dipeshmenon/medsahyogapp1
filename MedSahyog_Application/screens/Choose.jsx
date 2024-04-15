import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Login from './Login';

const Choose = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>MedSahyog</Text>
        <Text style={styles.tagline}>Connecting Patients and Physicians Seamlessly</Text>
      <TouchableOpacity style={[styles.card, styles.doctorCard]} onPress={() => navigation.navigate('Login1')}>
        <Text style={styles.cardText}>Doctor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.patientCard]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.cardText}>Patient</Text>
      </TouchableOpacity>
      <ImageBackground source={require('../assets/medicine.png' )} style={styles.image}>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
   tagline:{
        marginBottom:30,
    },
  heading:{
    fontSize: 40,
    fontWeight:'bold',
    paddingBottom:10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: 200,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 5,
  },
  doctorCard: {
    backgroundColor: 'blue',
  },
  patientCard: {
    backgroundColor: 'green',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginLeft:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Choose;
