import React, { Component } from 'react';
import { Text, View, Alert , StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
    Icon,
    Item, 
    Input
} from 'native-base'
import  ImagePicker  from 'react-native-image-picker'
import { editProfileFunc } from '../function/api';
import Host from '../environment/Host';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class EditProfile extends Component {
    constructor() {
        super() 
        this.state = {
            profilepicture : '' , 
            fullname : '',
            lastpicture : ''        
        }
    }
    componentDidMount() {
        const {userData} = this.props.navigation.state.params
        this.setState({profilepicture : {uri : userData.profilepicture},lastpicture : {uri : userData.profilepicture} , fullname : userData.fullname})
    }
    _handleFinishEdit = async () => {
        const formData = new FormData()
        formData.append("fullname" , this.state.fullname)
        if (this.state.profilepicture.uri != this.state.lastpicture.uri) {
            formData.append("profilepicture", this.state.profilepicture)
        }
        const res = await editProfileFunc(formData)
        console.log(res.data)
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
                <View style={styles.absolutebg}>
                    <Text style={styles.texthello}>Edit Profile</Text>
                    <Icon style={{color : 'white'}} onPress={this._handleFinishEdit} name="checkmark"/>
                </View>
                </View>
                <View >
                    <View style={{alignItems:"center", }}>
                        <Image style={styles.avatar} source={{uri :  this.state.profilepicture.uri}}/>   
                        <Icon onPress={this.handleChoosePhoto} name="camera"/>
                    </View>
                    <View style={{alignItems : "center", marginTop : 50}}>
                        <Item>
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

export default EditProfile

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
    nameInfo : {
        fontFamily : 'Montserrat-SemiBold',
        fontSize : 20
    }
})