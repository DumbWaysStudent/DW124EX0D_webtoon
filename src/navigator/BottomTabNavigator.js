import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator }  from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screen/Home'
import Profile from '../screen//Profile'
import Favorit from '../screen/Favorit'
import EditProfile from '../screen/EditProfile'

import Icon from 'react-native-vector-icons/Ionicons'
import AllWebtoon from '../screen/AllWebtoon';

const ProfileNavigator = createStackNavigator({
  Profile : {
    screen : Profile,
    navigationOptions : {
      header : null
    }
  },
  EditProfile : {
    screen : EditProfile,
    navigationOptions : {
        header : null
    }
}
})

const HomeNavigator = createStackNavigator({
  Home : {
    screen : Home,
    navigationOptions : {
      header : null
    }
  },
  AllWebtoon : {
    screen : AllWebtoon,
    navigationOptions : {
        headerTitle : "All Webtoon"
    }
}
})


const BottomTabNavigator =  createBottomTabNavigator({
    HomeNavigator: {
      screen: HomeNavigator,
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
    ProfileNavigator: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'PROFILE',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        )
      }
    }
  }, {
      tabBarOptions: {
        activeTintColor: '#443737',
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