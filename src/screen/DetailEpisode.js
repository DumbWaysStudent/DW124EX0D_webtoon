import React, { Component } from 'react';
import { View ,Text,Image, FlatList, Dimensions, Share, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderComp from '../component/header/HeaderComp';
import Host from '../environment/Host'
import {getEpisodeImage} from '../function/api'
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

const shareOptions = {
    title: 'KOMIKO',
    message: 'Read this webtoon', 
    url: 'http://google.com',
    subject: 'Subject'
  };

export default class DetailEpisode extends Component {
    constructor() {
        super() 
        this.state = {
            episodeId : '',
            episodeTitle : '',
            episodeContent : []
        }
    }
    async componentDidMount() {
        const {episodeId, episodeTitle, webtoonId} = this.props.navigation.state.params
        this.setState({episodeTitle})
        const episodeContent = await getEpisodeImage(episodeId,webtoonId)
        this.setState({episodeContent})
        
    }
    onSharePress = () => Share.share(shareOptions);
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp 
                iconDua={true} iconDuaName="share" pressIconDua={this.onSharePress} 
                title={this.state.episodeTitle} 
                onPressBack={() => this.props.navigation.goBack()}/>
                <View style={{marginBottom : 20, flex : 1}}>
                    <FlatList
                    style={{marginBottom :20}}
                    showsVerticalScrollIndicator={false}
                    data={this.state.episodeContent}
                    renderItem={({ item })=> 
                        <Image style={{width , height : height/3, marginBottom:5}} source={{uri : `${Host.imageHost}${item.uri}`}}/>
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </View>
                 <View style={styles.wrapBtn} >
                         <TouchableOpacity style={[styles.btnStyle, {borderRightWidth:1}]}>
                            <View >
                            <Text style={{color : 'white'}}>PREVIOUS</Text>
                            </View>
                         </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyle}>
                            <View >
                                <Text style={{color : 'white'}}>NEXT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapBtn : {
        position : "absolute",
        bottom : 0,
        flexDirection : 'row',
    },
    btnStyle : {
        height : 40,
        width : width /2,
        backgroundColor: '#443737',
       alignItems : "center",
       justifyContent : "center"
    }
    
})