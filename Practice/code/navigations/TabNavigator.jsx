import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import AddPage from '../pages/AddPage';

const Tabs = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'MainPage') {
            iconName += 'list';
          } else if (route.name === 'AddPage') {
            iconName += 'apps-outline';
          } else if (route.name === 'MyPage') {
            iconName += 'person';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? 'hotpink' : 'grey'}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          borderTopColor: 'lightgray',
          height: 40,
          fontSize: 10,
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="MainPage" component={MainPage} />
      <Tabs.Screen name="MyPage" component={MyPage} />
      <Tabs.Screen name="AddPage" component={AddPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
