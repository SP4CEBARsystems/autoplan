import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ToDoScreen from "./app/screens/ToDoScreen"
import PlanningScreen from "./app/screens/PlanningScreen"
import FocusScreen from "./app/screens/FocusScreen"
import Settings from "./app/screens/Settings"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ToDo"     component={ToDoScreen} />
        <Stack.Screen name="Planning" component={PlanningScreen} />
		    <Stack.Screen name="Focus"    component={FocusScreen} />
		    <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};