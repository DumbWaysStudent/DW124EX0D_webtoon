import React, { Component } from 'react';
import {Alert, View, Text, TextInput , StyleSheet, Dimensions, FlatList, Image} from 'react-native';

import {
    Button
} from 'native-base'
import HeaderComp from '../../component/header/HeaderComp';


const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export default class EditMyWebtoon extends Component {
    constructor() {
        super() 
        this.state = {
            webtoondata : '',
            episodeList : [{
                episodes : 1,
                title: 'The Secret of Angel',
                image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
              }, {
                episodes : 15,
                title: 'Pasutri Gaje',
                image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
              }, {
                episodes : 32,
                title: 'Young Mom',
                image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
              }]
        }
    }
    componentDidMount() {
        const {dataEdit} = this.props.navigation.state.params
        this.setState({webtoondata : dataEdit })
    }
    _handleFinisEditWebtoon = () => {
        this.props.navigation.navigate('WebtoonCreation')
    }
    _handleDeleteWebtoon = () => {
        Alert.alert(
            'Delete this Webtoon ?',
            '',
            [
              {text: 'No', onPress: () => {}},
              {text: 'Yes', onPress: () => this.props.navigation.navigate('WebtoonCreation')},
            ],
            {cancelable: false},
          );
        // let webtoonId = this.state.webtoondata._id
        // this.props.navigation.navigate('WebtoonCreation')
    }
    render() {

        return (
            <View style={styles.container}>
                <HeaderComp 
                iconDua={true} iconDuaName="checkmark" pressIconDua={this._handleFinishWebtoon} 
                title="Edit Webtoon" onPressBack={() => this.props.navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.titleStyle}>Title</Text>
                        <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.setState({ webtoondata : {...this.state.webtoondata,title : text}})}
                        value={this.state.webtoondata.title}
                        />
                    </View>
                    <View style={styles.episodeCont}>
                        <Text style={styles.titleStyle}>Episode</Text>
                        <FlatList
                            data={this.state.episodeList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                            // <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailEpisode', {dataEpisode : item})}>
                                <View style={styles.wrapContainerFlatlist}>
                                    <View style={styles.borderImage}>
                                        <Image style={styles.imageDilist} source={{uri : item.image}}/>
                                    </View>
                                    <View style={styles.infoComic}>
                                        <Text style={styles.textInfoComic}>{item.title}</Text>
                                        <Text>{item.episodes}</Text>
                                    </View>
                                </View>
                            // </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('NewEpisode')} style={styles.btnAdd}>
                        <Text style={{color : "white"}}>ADD EPISODE</Text>
                    </Button>
                    <Button onPress={this._handleDeleteWebtoon} style={styles.deleteAdd}>
                        <Text style={{color : "white"}}>DELETE WEBTOON</Text>
                    </Button>
                </View>    
            </View>
        );
    }
}

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
        justifyContent : "center",
        backgroundColor : '#443737'
    },
    deleteAdd : {
        marginTop : 20,
        justifyContent : "center",
        backgroundColor : 'red'
    }
})