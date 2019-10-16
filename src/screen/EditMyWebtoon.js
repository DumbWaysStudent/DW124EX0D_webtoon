import React, { Component } from 'react';
import {Alert, View, Text, TextInput , StyleSheet, Dimensions, FlatList, Image, TouchableOpacity} from 'react-native';
import {
    Button,
} from 'native-base'
import HeaderComp from '../component/header/HeaderComp';

import Host from '../environment/Host'
import { connect } from 'react-redux'

import {getUserWebtoon, getUserWebtoonEpisode } from '../redux/action/WebtoonAction'
import { getUserId, getUserToken, deleteWebtoon, editWebtoon } from '../function/api';

const width = Dimensions.get("window").width

class EditMyWebtoon extends Component {
    constructor() {
        super() 
        this.state = {
            webtoondata : '',
            data : {
                title : '',
                genre : ''
            }
            
        }
    }
    async componentDidMount() {
        const {dataEdit} = this.props.navigation.state.params
        this.setState({webtoondata : dataEdit, 
            data : {...this.state.data , title : dataEdit.title, genre : dataEdit.genre }})
        this.updateEpisodeReducer()
    }

    updateEpisodeReducer = async () => {
        const userToken = await getUserToken()
        await this.props.getUserWebtoonEpisode(userToken, this.state.webtoondata._id)
    } 

    _handleFinishEditWebtoon =async () => {
        const userToken = await getUserToken()
        const userId = await getUserId()
        await editWebtoon(this.state.data, this.state.webtoondata._id)
        await this.props.getUserWebtoon(userToken, userId)
        this.props.navigation.navigate('WebtoonCreation')
    }

    _handleDeleteWebtoon = () => {
        Alert.alert(
            'Delete this Webtoon ?',
            '',
            [
              {text: 'No', onPress: () => {}},
              {text: 'Yes', onPress: async () => {
                await deleteWebtoon(this.state.webtoondata._id)
                const userToken = await getUserToken()
                const userId = await getUserId()
                this.props.getUserWebtoon(userToken,userId)
              this.props.navigation.goBack()}
            },
            ],
            {cancelable: false},
          );
    }
    render() {

        return (
            <View style={styles.container}>
                <HeaderComp 
                iconDua={true} iconDuaName="checkmark" pressIconDua={this._handleFinishEditWebtoon} 
                title="Edit Webtoon" onPressBack={() => this.props.navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.titleStyle}>Title</Text>
                        <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.setState({data : { ...this.state.data,title : text} })}
                        value={this.state.data.title}
                        />
                    </View>
                    <View style={styles.episodeCont}>
                        <Text style={styles.titleStyle}>Episode</Text>
                        <FlatList
                            data={this.props.webtoon.episodesData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditEpisodeScreen', {dataEpisode : item, webtoonId: this.state.webtoondata._id, updateData : this.updateEpisodeReducer})}>
                                <View style={styles.wrapContainerFlatlist}>
                                    <View style={styles.borderImage}>
                                        <Image style={styles.imageDilist} source={{uri : `${Host.imageHost}${item.thumbnail}`}}/>
                                    </View>
                                    <View style={styles.infoComic}>
                                        <Text style={styles.textInfoComic}>{item.title}</Text>
                                        <Text>{item.updatedAt.slice(0,10)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('NewEpisode', {webtoonId : this.state.webtoondata._id, updateData: this.updateEpisodeReducer})} style={styles.btnAdd}>
                        <Text style={{color : "white"}}>ADD EPISODE</Text>
                    </Button>
                    <Button onPress={this._handleDeleteWebtoon} style={styles.deleteAdd}>
                        <Text style={{color : "red"}}>DELETE WEBTOON</Text>
                    </Button>
                </View>    
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
      webtoon: state.webtoonReducer
    };
  }

export default connect(
    mapStateToProps,
    { getUserWebtoon , getUserWebtoonEpisode }
  )(EditMyWebtoon)


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
        paddingTop : 15,
        flex : 1
    },
    btnAdd : {
        marginTop : 20,
        justifyContent : "center",
        backgroundColor : '#443737'
    },
    deleteAdd : {
        marginTop : 20,
        justifyContent : "center",
        backgroundColor : 'white'
    }
})