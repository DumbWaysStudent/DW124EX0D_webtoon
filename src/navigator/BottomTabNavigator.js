import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator }  from 'react-navigation-tabs'
import Home from '../screen/mainscreen/afterlogin/Home'
import Profile from '../screen/mainscreen/afterlogin/Profile'
import Favorit from '../screen/mainscreen/afterlogin/Favorit'

import Icon from 'react-native-vector-icons/Ionicons'

const BottomTabNavigator =  createBottomTabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'FOR YOU',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="logo-windows" color={tintColor} size={24} />
        )
      }
    },
    Favorit: {
      screen: Favorit,
      navigationOptions: {
        tabBarLabel: 'FAVORIT',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-star" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'PROFILE',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        )
      }
    }
  }, {
      tabBarOptions: {
        activeTintColor: '#2ce617',
        inactiveTintColor: '#6C7B95',
        style: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5
        }
      },
    },
)

export default createAppContainer(BottomTabNavigator)