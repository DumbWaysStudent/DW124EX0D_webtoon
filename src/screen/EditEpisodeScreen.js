import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    FlatList,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import {
    Button
} from 'native-base'
import Host from '../environment/Host'
import ImagePicker from 'react-native-image-picker'
import HeaderComp from '../component/header/HeaderComp';
import {ButtonKecil} from '../component/button/ButtonLogReg'
import { getEpisodeImage, deleteEpisode, deleteEpisodeImage, editEpisodeWebtoon } from '../function/api';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class EditEpisodeScreen extends Component {
    constructor() {
        super() 
        this.state = {
            dataEpisode : null,
            imageData : [], 
            webtoonId : '',
            data : {
                title : '',
                newImage : [],
            }   
        }
    }

    async componentDidMount() {
        const {dataEpisode, webtoonId} = this.props.navigation.state.params
        this.setState({dataEpisode, data  :{...this.state.data,title :  dataEpisode.title}, webtoonId})
        const imageData = await getEpisodeImage(dataEpisode._id, webtoonId)
        this.setState({imageData})
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
              this.state.data.newImage.push(source)
              this.setState({})
            }
          });
      };
    _handleFinishEditEpisode = async () => {
        if(this.state.data.title !== ""){
            const formData = new FormData()
            formData.append("title" , this.state.data.title)
            if(this.state.data.newImage.length > 0) {
                this.state.data.newImage.forEach(content => {
                    formData.append("contentImage", content);
                });
            }      
            await editEpisodeWebtoon(formData, this.state.dataEpisode._id, this.state.webtoonId)
            this.props.navigation.state.params.updateData()
            this.props.navigation.goBack()
        }else {
            alert("Title tidak boleh kosong")
        }
        
    }

    handleDeleteNewImage = (item) => {
        const indexItem = this.state.data.newImage.indexOf(item)
        this.state.data.newImage.splice(indexItem, 1)
        this.setState({})
    }

    handleDeleteStoreImage = async (imageId) => {
        await deleteEpisodeImage(imageId , this.state.dataEpisode._id, this.state.webtoonId)
        const imageData = await getEpisodeImage(this.state.dataEpisode._id, this.state.webtoonId)
        this.setState({imageData})
    }
    _handleDeleteEpisode = () => {
        Alert.alert(
            'Delete this Episode ?',
            '',
            [
              {text: 'No', onPress: () => {}},
              {text: 'Yes', onPress: async () => {
                await deleteEpisode(this.state.dataEpisode._id, this.state.webtoonId)
                this.props.navigation.state.params.updateData()
                this.props.navigation.goBack()
                
                }},
            ],
            {cancelable: true},
          );
    }
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp 
                iconDua={true} iconDuaName="checkmark" pressIconDua={this._handleFinishEditEpisode}
                title="Edit Episode" onPressBack={() => this.props.navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.titleStyle}>Name</Text>
                        <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.setState({data : {...this.state.data,title : text } })}
                        value={this.state.data.title}
                        />
                    </View>
                        <Text style={styles.titleStyle}>Add Images</Text>
                        <FlatList
                        data={this.state.imageData}
                        renderItem={({ item }) => 
                        <View style={{paddingBottom : 5}}>
                            <View style={{flexDirection : "row"}}>
                                <Image style={styles.imageList} source={{uri : `${Host.imageHost}${item.uri}`}} />
                                <View style={{paddingLeft : 20, justifyContent : "center"}}>
                                    {item.name ? <Text>
                                        {item.name}
                                    </Text> : null}
                                    <ButtonKecil onPressButton={() => this.handleDeleteStoreImage(item._id)} namaButton="Delete"/>
                                 </View>
                            </View>
                        </View>
                           
                    }
                        keyExtractor={(item,index) => index.toString()}
                        />
                        <FlatList
                        data={this.state.data.newImage}
                        renderItem={({ item }) => 
                        <View style={{paddingBottom : 5}}>
                            <View style={{flexDirection : "row"}}>
                                <Image style={styles.imageList} source={{uri : item.uri}} />
                                <View style={{paddingLeft : 20, justifyContent : "center"}}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    <ButtonKecil onPressButton={() => this.handleDeleteNewImage(item)} namaButton="Delete"/>
                                 </View>
                            </View>
                        </View>
                           
                    }
                        keyExtractor={(item,index) => index.toString()}
                        />
                    </View>
                    <Button onPress={this.handleChoosePhoto} style={styles.btn}>
                        <Text style={styles.txtBtn}>+ IMAGE</Text>
                    </Button>
                    <Button onPress={this._handleDeleteEpisode} style={styles.deleteAdd}>
                        <Text style={{color : "red"}}>DELETE EPISODE</Text>
                    </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyContainer : {
        padding : 30,
        flex : 1
    },
    titleStyle : {
        fontFamily : 'Montserrat-SemiBold',
        fontSize : 20
    },
    imageList : {
        width : width/5,
        height : width/5
    },
    btn : {
        justifyContent : "center",
        backgroundColor : '#443737',
        marginTop : 20
    },
    txtBtn : {
        color : "white"
    },
    deleteAdd : {
        marginTop : 20,
        justifyContent : "center",
        backgroundColor : 'white'
    },
})