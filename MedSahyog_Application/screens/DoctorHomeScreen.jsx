import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import BottomNavBar2 from './BottomNavbar2';

const { width } = Dimensions.get('window');

const DoctorHomeScreen = ({ navigation }) => {
  const carouselData = [
    require('../assets/c1.jpg'),
    require('../assets/c2.jpg'),
    require('../assets/c3.jpg'),
    require('../assets/c4.jpg'),
  ];

  const departments = ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Dermatology', 'Gynaecology', 'Pediatrics'];
  const handleLogout = async () => {
    console.log('Logout button pressed'); // Add this line for debugging
    try {
      await axios.put('http://10.24.85.158:5000/api/logout');
      navigation.navigate('Choose');
    } catch (error) {
      console.error('Error logging out:', error);
    }};
  // Render carousel item
  const renderCarouselItem = ({ item }) => (
    <Image source={item} style={styles.carouselImage} resizeMode="cover" />
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Carousel
          style={styles.carouselContainer} // Changed from styles.CarouselContainer to styles.carouselContainer
          data={carouselData}
          renderItem={renderCarouselItem}
          sliderWidth={width - 40} // Adjusted width to match the book appointment container
          itemWidth={width - 40}   // Adjusted width to match the book appointment container
          loop
        />

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.appointmentContainer}>
              <Text style={styles.cardTitle}>24 Hours Service</Text>
              <MaterialCommunityIcons name="hours-24" size={24} color="black" />
            </View>
            <Text style={styles.cardText}>Online Appointment</Text>
            <Text style={styles.cardText}>Get all-time support for emergency. We have introduced the principle of family medicine.</Text>
            <TouchableOpacity style={styles.bookAppointmentButton}>
              <View style={styles.bookAppointmentContent}>
                <Text style={styles.bookAppointmentButtonText} onPress={() => navigation.navigate('BookAppointment')}>Book an Appointment</Text>
                <MaterialCommunityIcons name="book-account-outline" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.card}>
            <View style={styles.appointmentContainer}>
              <Text style={styles.cardTitle}>Timing Schedule</Text>
              <AntDesign name="clockcircleo" size={24} color="black" />
            </View>
            <Text style={styles.timingText} >Working Hours</Text>
            <Text style={styles.timingText}>Sun - Wed : 8:00 - 18:00</Text>
            <Text style={styles.timingText}>Thu - Fri : 9:00 - 18:00</Text>
            <Text style={styles.timingText}>Sat - Sun : 10:00 - 18:00</Text>
          </View> */}

          <View style={styles.card}>
            <View style={styles.appointmentContainer}>
              <Text style={styles.cardTitle}>Emergency Cases</Text>
              <AntDesign name="customerservice" size={24} color="black" />
            </View>
            <Text style={styles.cardText}>1-800-700-6200</Text>
            <Text style={styles.cardText}>Get all-time support for emergency. We have introduced the principle of family medicine. Get connected with us for any urgency.</Text>
          </View>
        </View>
        <Button title="Logout" onPress={handleLogout} />
        <Text style={styles.cardTitle}>We specialize in:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.departmentsContainer}>
          {departments.map((department, index) => (
            <Text key={index} style={styles.department}>{department}</Text>
          ))}
           
        </ScrollView>
      </ScrollView>

      <BottomNavBar2 navigation={navigation}/>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ade0d6',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  carouselContainer: {
    marginTop: 0, 
    alignSelf: 'center', // Center the carousel horizontally
  },
  carouselImage: {
    width: width - 40, // Adjusted width to match the book appointment container
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
  },
  bookAppointmentButton: {
    backgroundColor: '#02D0C2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  appointmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookAppointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookAppointmentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  timingText: {
    fontSize: 14,
  },
  departmentsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  department: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#20426e',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 20,
    width: 130,
    height: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default DoctorHomeScreen;
