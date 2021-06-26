import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Screens/HomeScreen';
import Login from './src/Screens/Login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateTaskScreen from './src/Screens/CreateTaskScreen';
import DoneScreen from './src/Screens/DoneScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Todo" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Add" component={CreateTaskScreen} options={{ headerShown: false, tabBarVisible: false, }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();;

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        activeTintColor: 'brown',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 15,
          fontWeight:'bold',
          margin: 0,
          padding: 0,
        },
      }}>
        <Tab.Screen name="Login" component={Login} options={{
          tabBarVisible: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Todo" component={HomeStackScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Done" component={DoneScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark" color={color} size={size} />
          ),
        }} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;



