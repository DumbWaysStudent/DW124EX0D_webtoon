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
import ImagePicker from 'react-native-image-picker'
import HeaderComp from '../../component/header/HeaderComp';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class EditEpisodeScreen extends Component {
    constructor() {
        super() 
        this.state = {
            dataEpisode : {title : ''},
            episodes : [{
                episodes : 1,
                name: 'The Secret of Angel',
                uri: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
              }, {
                episodes : 15,
                name: 'Pasutri Gaje',
                uri: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
              }, {
                episodes : 32,
                name: 'Young Mom',
                uri: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
              }]
        }
    }

    componentDidMount() {
        const {dataEpisode} = this.props.navigation.state.params
        this.setState({dataEpisode})
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
              this.state.episodes.push(source)
              this.setState({})
            }
          });
      };
    _handleFinishEditEpisode = () => {
        this.props.navigation.goBack()
    }
    _handleDeleteEpisode = () => {
        Alert.alert(
            'Delete this Episode ?',
            '',
            [
              {text: 'No', onPress: () => {}},
              {text: 'Yes', onPress: () => this.props.navigation.goBack()},
            ],
            {cancelable: false},
          );
        // let webtoonId = this.state.webtoondata._id
        // this.props.navigation.navigate('WebtoonCreation')
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
                        onChangeText={text => this.setState({ dataEpisode : {...this.state.dataEpisode,title : text}})}
                        value={this.state.dataEpisode.title}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleStyle}>Add Images</Text>
                        <FlatList
                        data={this.state.episodes}
                        renderItem={({ item }) => 
                        <View style={{paddingBottom : 5}}>
                            <View style={{flexDirection : "row"}}>
                                <Image style={styles.imageList} source={{uri : item.uri}} />
                                <View style={{justifyContent : "center"}}>
                                    <Text>
                                        {item.name}
                                    </Text>
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
                        <Text style={{color : "white"}}>DELETE EPISODE</Text>
                    </Button>

                </View>
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
        backgroundColor : 'red'
    }
})