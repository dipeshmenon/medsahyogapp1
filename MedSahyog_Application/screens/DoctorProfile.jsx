import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const DoctorProfile = () => {
  const navigation = useNavigation();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get('http://10.24.85.158:5000/api/doctorc');
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Profile</Text>
      {doctor ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.profileRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{doctor.name}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.profileRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{doctor.email}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.profileRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>{doctor.department}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#02D0C2',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#fff'
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
});

export default DoctorProfile;
