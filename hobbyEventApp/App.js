import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/Home';
import EventScreen from './screens/Event';
import EventWebPage from './screens/EventWebPage';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#F7F7F7',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen
          name="Event Detail"
          component={EventWebPage}
          options={{
            headerShown: true,
            title: 'Etkinlik Sayfası',
            headerBackTitle: 'Etkinlik',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
