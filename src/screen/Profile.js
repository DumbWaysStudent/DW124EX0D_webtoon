import React, { Component } from 'react';
import { Text, View, StatusBar , StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {
    Icon,
    Button
} from 'native-base'
import { getUser, getUserId } from '../function/api';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import {getProfile} from '../redux/action/UserAction'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class Profile extends Component {
    constructor() {
        super() 
        this.state = {
            userData : '',
        }
    }
    
    async componentDidMount() {
    //    const userData = await getUser()
    //    this.setState({userData})
    //    console.log(userData)
    const a = await getUserId()
    await this.props.getProfile(a)
        
    }
    onPressLogout = async () => {
        try {
            await AsyncStorage.clear()
            this.props.navigation.navigate('GuestNavigator')
          } 
          catch(e) {
              alert(e)      
        };
    }

    
    
    
    render() {
        return (
            <View style={{ position : 'relative', backgroundColor:'#f7f7f7', flex : 1}}>
                <StatusBar
                backgroundColor="#443737" />
                <View style={{width : SCREEN_WIDTH , height: SCREEN_HEIGHT/8,}}>
                    <View style={styles.absolutebg}>
                        <Text style={styles.texthello}> Profile</Text>
                        <Icon style={{color : 'white'}} onPress={() => this.props.navigation.navigate('EditProfile', {userData : this.props.userData})} name="create"/>
                    </View>
                </View>
                <View >
                    <View style={{alignItems:"center", }}>
                    {/* `${Host.localhost}${this.state.userData.profilepicture}` */}
                        <Image style={styles.avatar} source={{uri : this.props.userData.profilepicture}}/>
                        <Text style={styles.nameInfo}>{this.props.userData.fullname}</Text>
                    </View>
                    <View style={styles.action} >
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('WebtoonCreation')}
                        style={styles.touchableX}>
                            <View style={styles.wrapItemTou}>
                                <Text>My Webtoon Creation</Text>
                                <Icon name="fastforward"/>
                            </View>
                        </TouchableOpacity> 
                    </View>
                </View>   
                <Button style={styles.logout} onPress={this.onPressLogout} >
                    <Text style={{color : 'white'}}>LOGOUT</Text>
                </Button>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
      userData: state.userReducer.userData
    };
  }
  

export default connect(
    mapStateToProps,
    { getProfile }
  )(Profile)

const styles = StyleSheet.create({
    absolutebg : {
        padding: 20,
        backgroundColor: '#443737',
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        width : SCREEN_WIDTH,
        borderBottomEndRadius: SCREEN_WIDTH,
        borderBottomStartRadius: SCREEN_WIDTH,
        height : SCREEN_HEIGHT/4,
    },  
    avatar : {
        padding: 20,
        width: SCREEN_WIDTH/2.5,
        height : SCREEN_WIDTH/2.5,
        borderRadius:SCREEN_WIDTH/5,
        borderColor: '#eaebd8',
        borderWidth:3
    },
    texthello : {
        fontSize: 20,
        color: 'white',
        fontFamily: "OpenSans-SemiBold"
    },
    logout : {
        alignSelf : "flex-end",
        position : "absolute",
        bottom : 0,
        backgroundColor: '#443737',
        width : SCREEN_WIDTH,
        justifyContent : "center"
    },
    touchableX : {
        justifyContent : "center",
        height : SCREEN_HEIGHT/14,
        width : '100%',
        backgroundColor : 'white',
        borderWidth : 1,
        borderRadius : 5,
        marginBottom : 30
    },
    wrapItemTou : {
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : "center",
        marginHorizontal : 20
    },
    action : {
        paddingVertical : 50
    },
    nameInfo : {
        fontFamily : 'Montserrat-SemiBold',
        fontSize : 20
    }
})