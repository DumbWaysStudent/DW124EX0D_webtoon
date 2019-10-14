import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';


class CheckUser extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    try {
      //Cek Token Pas Awal
      const userToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      if (userId != null) {
        this.props.navigation.navigate('MemberNavigator')
      }
      else {
        this.props.navigation.navigate('GuestNavigator')
      }
    } catch (e) {
      alert(e)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 300, height: 300 ,justifyContent:"center",alignContent:"center"}}
          source={require('../assets/image/logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
    
  }
})

//export default App;
export default CheckUser;