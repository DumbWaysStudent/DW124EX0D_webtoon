import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet, Dimensions, Image} from 'react-native';

import HeaderComp from '../component/header/HeaderComp';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { getUserWebtoon } from '../redux/action/WebtoonAction'

import { newWebtoon, getUserId, getUserToken } from '../function/api';
import ImagePicker from 'react-native-image-picker'
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

class CreateWebtoon extends Component {
    constructor() {
        super() 
        this.state = {
            data : {
                title : '',
                genre : '',
                coverImage : null
            },
            errorMsg : ''
            
        }
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
              const source = tmpPhoto;
              this.setState({
                data : {...this.state.data, coverImage : source}
            });
            }
          });
      };

    _handleFinishWebtoon = async () => {
        if(this.state.data.title === '' || this.state.data.coverImage=== null) {
            this.setState({errorMsg : "Title atau image tidak boleh kosong"})
        }
        else {
            const userId = await getUserId()
            const userToken = await getUserToken()
            await newWebtoon(this.state.data)
            await this.props.getUserWebtoon(userToken,userId)
            this.props.navigation.navigate('WebtoonCreation')
            
        }
        
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderComp 
                iconDua={true} iconDuaName="checkmark" pressIconDua={this._handleFinishWebtoon} 
                title="Create Webtoon" onPressBack={() => this.props.navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.titleStyle}>Title</Text>
                        <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.setState({ data :{...this.state.data,  title : text}})}
                        value={this.state.data.title}
                        />
                        <Text style={styles.errorText}>{this.state.errorMsg}</Text>
                        <Text style={styles.titleStyle}>Genre</Text>
                        <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.setState({ data :{...this.state.data,  genre : text}})}
                        value={this.state.data.genre}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleStyle}>Add webtoon cover</Text>
                        <View style={{alignItems : "center", marginTop : 30}}>
                            {this.state.data.coverImage != null ? 
                            <Image style={{width : 150, height : 150}} source={{uri : this.state.data.coverImage.uri}}/> :
                            <Icon name="images" size={120}/> 
                            
                        }
                        </View>
                        <View style={{alignItems : "center"}}>
                            <Icon onPress={this.handleChoosePhoto} size={30} name="camera"/>
                        </View>
                        
                    </View>
                </View>    
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
      webtoon : state.webtoonReducer.webtoon
    };
  }
export default connect(
    mapStateToProps,
    {getUserWebtoon}
  )(CreateWebtoon)


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    imageDilist : {
        width : width/6,
        height : width/6,
    },
    wrapGedeList : {
        paddingTop : 80 ,
        padding : 30
    },
    borderImage : {
        borderWidth : 4
    },
    infoComic : {
        paddingLeft : 10,
        justifyContent : "center"
    },
    textInfoComic : {
        fontFamily : 'Courgette-Regular',
        fontWeight : '600',
        paddingBottom : 10,
        fontSize : 18
    },
    wrapContainerFlatlist : {
        flexDirection: 'row', 
        paddingTop:20
    },
    bodyContainer : {
        padding : 30,
        flex : 1
    },
    titleStyle : {
        fontFamily : 'Montserrat-SemiBold',
        fontSize : 20
    },
    episodeCont : {
        paddingTop : 15
    },
    btnAdd : {
        marginTop : 20,
        bottom : 0,
        position : "absolute",
        justifyContent : "center",
        backgroundColor : '#443737',
        width 
    },
    errorText : {
        color : 'red'
    }
})