import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PublicRoutesTypes} from '../types/AllRoutes';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignUpScreen} from '../screens/auth';

const PublicRoutes = () => {
  const Stack = createNativeStackNavigator<PublicRoutesTypes>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
