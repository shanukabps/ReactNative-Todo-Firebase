import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SplashScreen from './SplashScreen';




const RootStack = createStackNavigator();

export const  RootStackScreen = () => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="login" component={Login} />
  
    </RootStack.Navigator>
);

 