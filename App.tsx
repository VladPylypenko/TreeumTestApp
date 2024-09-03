import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import { NativeBaseProvider } from 'native-base';
import AlbumDetailsScreen from './src/screens/AlbumDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Album' component={AlbumScreen} />
          <Stack.Screen name='AlbumDetails' component={AlbumDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
