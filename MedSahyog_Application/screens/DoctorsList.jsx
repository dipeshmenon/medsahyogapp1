import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import doctors from './ListOfDoctors.js';
import BottomNavBar from './BottomNavbar.jsx';

const DoctorsList = ({navigation}) => {
  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Get to know our doctors</Text>
      <View style={styles.doctorsContainer}>
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </View>
    </ScrollView>
    <BottomNavBar navigation={navigation}/>
    </View>
  );
};

const DoctorCard = ({ doctor }) => {
  const [showDescription, setShowDescription] = useState(false);
  const { name, specialty, description, photo } = doctor;

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <TouchableOpacity onPress={toggleDescription} style={styles.doctorCard}>
      <View style={styles.cardContent}>
        <Image source={photo} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{name}</Text>
        <Text style={styles.doctorSpecialty}>{specialty}</Text>
        {showDescription && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{description}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ade0d6',
    paddingVertical: 20,
  },
  heading: {
    backgroundColor: '#252769',
    color: 'white',
    padding: 20,
    textAlign: 'center',
    fontSize: 24,
    marginTop: -20,
  },
  doctorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  doctorCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  doctorImage: {
    width: '50%',
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 16,
    marginBottom: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(77, 173, 189, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  overlayText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DoctorsList;
