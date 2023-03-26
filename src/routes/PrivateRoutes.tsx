import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '../types/AllRoutes';
import {HomeScreen, MovieDetailsScreen, TvAction} from '../screens/private';
import BottomTabs from './BottomTabs';

const PrivateRoutes = () => {
  const Stack = createNativeStackNavigator<PrivateRoutesTypes>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
      <Stack.Screen name="TvAction" component={TvAction} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
