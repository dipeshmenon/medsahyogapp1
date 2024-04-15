import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Choose from './screens/Choose';
import Login from './screens/Login';
import Register from './screens/Register';
import BookAppointment from './screens/BookAppointment';
import PatientHomeScreen from './screens/PatientHomeScreen';
import DoctorHomeScreen from './screens/DoctorHomeScreen';
import DoctorsList from './screens/DoctorsList';
import Login1 from './screens/Login1';
import PatientProfile from'./screens/PatientProfile';
import UpdatePatientProfile from './screens/UpdatePatientProfile';
import AppointmentList from './screens/AppointmentList';
import DoctorAppointmentList from './screens/DoctorAppointmentList';
import DoctorProfile from'./screens/DoctorProfile';
import UnavailabilitySet from './screens/UnavailabilitySet';


const Drawer=createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Choose" component={Choose} />
        <Drawer.Screen name='Login' component={Login}/>
        <Drawer.Screen name='Login1' component={Login1}/>
        <Drawer.Screen name='Register' component={Register}/>
        <Drawer.Screen name="PatientHomeScreen" component={PatientHomeScreen} />
        <Drawer.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
        <Drawer.Screen name="BookAppointment" component={BookAppointment} />
        <Drawer.Screen name="DoctorsList" component={DoctorsList} />
        <Drawer.Screen name="PatientProfile" component={PatientProfile}/>
        <Drawer.Screen name="UpdatePatientProfile" component={UpdatePatientProfile}/>
        <Drawer.Screen name="AppointmentList" component={AppointmentList}/>
        <Drawer.Screen name="DoctorProfile" component={DoctorProfile}/>
        <Drawer.Screen name="UnavailabilitySet" component={UnavailabilitySet}/>
        <Drawer.Screen name="DoctorAppointmentList" component={DoctorAppointmentList}/>
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
