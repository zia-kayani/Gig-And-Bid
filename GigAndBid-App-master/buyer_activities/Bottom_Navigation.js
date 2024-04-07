//Start//import React, { Component } from 'react'

// import HomeScreen from './Screens/Home';
// import NotificationScreen from './Screens/Notification';
// import ProfileScreen from './Screens/Profile';
// import SearchScreen from './Screens/Search';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
// import { View } from 'react-native-web';



// const Tab = createMaterialBottomTabNavigator();



// export default function Botto() {
//   return (
//     <NavigationContainer>
//     <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#00796B' }} activeColor="white" >
//       <Tab.Screen name="Home" component={HomeScreen}            //Home Screen
//       options={{
//         tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26}/>
//         ),
//     }}/>
//       <Tab.Screen name="Search" component={SearchScreen}        // Search Screen
//       options={{
//         tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="magnify" color={color} size={26}/>
//         ),
//     }}/>
//       <Tab.Screen name="Notification" component={NotificationScreen}      // Notification Screen
//       options={{
//         tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="heart" color={color} size={26}/>
//         ),
//     }}/>
//       <Tab.Screen name="Profile" component={ProfileScreen}            // Profile Screen
//       options={{
//         tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
//         ),
//     }}/>
//     </Tab.Navigator>
//     </NavigationContainer>
//   );
//End//}

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bottom_Navigation = () => {
  return (
    <View>
      <Text>Bottom_Navigation</Text>
    </View>
  )
}

export default Bottom_Navigation

const styles = StyleSheet.create({})