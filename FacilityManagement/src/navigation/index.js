import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeNavigator } from './HomeNavigator';
import { AuthNavigator } from './AuthNavigator';

export function RootNavigator() {

  return (
    <NavigationContainer>
      { false ? <HomeNavigator /> : <AuthNavigator /> }
    </NavigationContainer>
  );
}
