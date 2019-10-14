import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet, Dimensions, FlatList, Image} from 'react-native';

import {
    Button
} from 'native-base'
import HeaderComp from '../component/header/HeaderComp';

import { connect } from 'react-redux'
import Host from '../environment/Host';
import { newWebtoon } from '../function/api';

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

class CreateWebtoon extends Component {
    constructor() {
        super() 
        this.state = {
            data : {
                webtoonTitle : '',
                episodes : []
            },
            errorMsg : ''
            
        }
    }
    _handleFinishWebtoon = async () => {
        if(this.state.data.webtoonTitle != '') {
            this.props.episodesData.map(
                item => this.state.data.episodes.push(item._id)
                )
            await newWebtoon(this.state.data)
            this.props.navigation.navigate('WebtoonCreation')
        }
        else {
            this.setState({errorMsg : "Title tidak boleh kosong"})
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
                        onChangeText={text => this.setState({ data :{...this.state.data,  webtoonTitle : text}})}
                        value={this.state.data.webtoonTitle}
                        />
                        <Text style={styles.errorText}>{this.state.errorMsg}</Text>
                    </View>
                    <View style={styles.episodeCont}>
                        <Text style={styles.titleStyle}>Episode</Text>
                        <FlatList
                            data={this.props.episodesData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                            // <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailEpisode', {dataEpisode : item})}>
                                <View style={styles.wrapContainerFlatlist}>
                                    <View style={styles.borderImage}>
                                        <Image style={styles.imageDilist} source={{uri : `${Host.imageHost}${item.episodesContent[0]}`}}/>
                                    </View>
                                    <View style={styles.infoComic}>
                                        <Text style={styles.textInfoComic}>{item.episodeName}</Text>
                                        <Text>{item.createdAt}</Text>
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
                </View>    
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
      episodesData : state.webtoonReducer.episodesData
    };
  }
export default connect(
    mapStateToProps,
    null
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