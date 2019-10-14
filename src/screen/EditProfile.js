import React, { Component } from 'react';
import { Text, View, Alert , StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
    Icon,
    Item, 
    Input
} from 'native-base'
import  ImagePicker  from 'react-native-image-picker'

import { connect } from 'react-redux'
import { getProfile } from '../redux/action/UserAction'
import { editProfileFunc, getUserToken } from '../function/api';

import Host from '../environment/Host'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class EditProfile extends Component {
    constructor() {
        super() 
        this.state = {
            profilepicture : '' , 
            fullname : '',
            lastpicture : '',
            userId : ''        
        }
    }
    componentDidMount() {
        const {userData} = this.props.navigation.state.params
        this.setState({
            profilepicture : {uri : `${Host.imageHost}${userData.profilepicture}`},
            lastpicture : {uri : `${Host.imageHost}${userData.profilepicture}`} , 
            fullname : userData.fullname,
            userId : userData._id
        })
    }
    _handleFinishEdit =  async () => {
        const formData = new FormData()
        formData.append("fullname" , this.state.fullname)
        if (this.state.profilepicture.uri != this.state.lastpicture.uri) {
            formData.append("profilepicture", this.state.profilepicture)
        }
        await editProfileFunc(formData)
        const userToken = await getUserToken()
        await this.props.getProfile(userToken)  
        this.props.navigation.navigate('Profile')
    }

    handleChoosePhoto = () => {
        const options = {
            title: 'Pilih Photo',
            customButtons: [],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              let tmpPhoto = {
                uri: response.uri,
                type: response.type,
                name: response.fileName,
              };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              const aa = tmpPhoto;
              this.setState({
                profilepicture : aa
            });
            }
          });
      };

    render() {
        return (
            <ScrollView style={{ position : 'relative', backgroundColor:'#f7f7f7'}}>
                <View style={{width : SCREEN_WIDTH , height: SCREEN_HEIGHT/8,}}>
                <View style={styles.headerCustom}>
                    <Text style={styles.texthello}>Edit Profile</Text>
                    <Icon style={{color : '#443737'}} onPress={this._handleFinishEdit} name="checkmark"/>
                </View>
                </View>
                <View >
                    <View style={{alignItems:"center", }}>
                        <Image style={styles.avatar} source={{uri :  this.state.profilepicture.uri}}/>   
                        <Icon onPress={this.handleChoosePhoto} name="camera"/>
                    </View>
                    <View style={{alignItems : "center", marginTop : 50, }}>
                        <Item style={{width : SCREEN_WIDTH*3/4, borderEndWidth : 1}}>
                            <Input
                            onChangeText={text => this.setState({fullname : text})}
                            value={this.state.fullname}
                            />
                        </Item>
                    </View>
                    
                </View>
                
               
            </ScrollView>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
      getProfile : (userId) => {
        dispatch(getProfile(userId))
      }
    };
  };
export default connect(mapDispatchToProps, { getProfile })(EditProfile)

const styles = StyleSheet.create({
    headerCustom : {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
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
        color: '#443737',
        fontFamily: "OpenSans-SemiBold"
    },
    nameInfo : {
        fontFamily : 'Montserrat-SemiBold',
        fontSize : 20
    }
})