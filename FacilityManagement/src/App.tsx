import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigator } from './navigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <RootNavigator/>
  );
}

export default App;
