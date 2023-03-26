import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {BottomTabType} from '../types/AllRoutes';
import {FavoriteScreen, HomeScreen, MyList} from '../screens/private';
import {COLORS} from '../styles';

const Tab = createBottomTabNavigator<BottomTabType>();

export default function BottomTabs() {
  // console.log(user);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {fontFamily: 'Montserrat-Bold'},
          tabBarActiveTintColor: 'red',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
            // height: 70,
          },
        }}>
        <Tab.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name={'FavoriteScreen'}
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="heart" color={color} size={size} />
            ),
            tabBarLabel: 'Like',
          }}
        />
        <Tab.Screen
          name={'MyList'}
          component={MyList}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="plus" color={color} size={size} />
            ),
            tabBarLabel: 'My List',
          }}
        />
      </Tab.Navigator>
    </>
  );
}
