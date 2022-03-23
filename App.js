import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
//import the screens users will navigate
import Start from './components/Start';
import Chat from './components/Chat';
//import react native gesture handler library
import 'react-native-gesture-handler';
//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import React from 'react';
import CustomActions from './CustomActions';


const Stack = createStackNavigator();

export default class App extends React.Component {
  
//navigates the layers from start to chat back to start
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


