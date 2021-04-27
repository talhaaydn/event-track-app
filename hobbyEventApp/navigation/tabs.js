import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import EventScreen from '../screens/Event';

import {Home, Search} from '../components/icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',

          elevation: 0,
          shadowColor: '#5bc4ff',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.text,
                focused ? styles.textFocused : styles.textNotFocused,
              ]}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Home stroke={focused ? '#542AE7' : '#D8DBE9'} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Search"
        component={EventScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[focused ? {color: '#542AE7'} : {color: '#D8DBE9'}]}>
              Search
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Search
              stroke={focused ? '#542AE7' : '#D8DBE9'}
              width={24}
              height={24}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Inter-Regular', fontSize: 12},
  textFocused: {
    color: '#542AE7',
  },
  textNotFocused: {
    color: '#D8DBE9',
  },
});

export default Tabs;
