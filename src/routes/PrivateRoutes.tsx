import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '../types/AllRoutes';
import {HomeScreen} from '../screens/private';

const PrivateRoutes = () => {
  const Stack = createNativeStackNavigator<PrivateRoutesTypes>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
