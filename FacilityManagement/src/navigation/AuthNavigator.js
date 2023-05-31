import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/login/Login';
import { NAVIGATION } from '../constants/navigation';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          component={Login} 
          name={NAVIGATION.login} 
          options={{ headerShown: false }} 
        />
    </Stack.Navigator>
  );
}
