import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PublicRoutesTypes} from '../types/AllRoutes';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/auth';

const PublicRoutes = () => {
  const Stack = createNativeStackNavigator<PublicRoutesTypes>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
