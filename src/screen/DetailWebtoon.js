import React, { Component } from 'react';
import { 
    View, 
    FlatList,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Share
} from 'react-native';
import HeaderComp from '../component/header/HeaderComp';
import { getEpisode } from '../function/api';
import Host from '../environment/Host'
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width


const shareOptions = {
    title: 'KOMIKO',
    message: 'Read this webtoon here', 
    url: 'http://google.com',
    subject: 'Subject'
  };

export default class DetailWebtoon extends Component {
    constructor() {
        super() 
        this.state = {
            webtoonData : '',
            episodeData : []
        }
    }
    async componentDidMount() {
        const {webtoonData} = this.props.navigation.state.params
        const episodeData = await getEpisode(webtoonData._id)
        this.setState({episodeData, webtoonData})
    }
    onSharePress = () => Share.share(shareOptions);
    render() {
        
        
        return (
            <View style={{flex : 1}}>
                <HeaderComp 
                iconDua={true} iconDuaName="share" pressIconDua={this.onSharePress} 
                title={this.state.webtoonData.title} onPressBack={() => this.props.navigation.goBack()}/>
                <View style={{flex : 1}}>
                <View style={styles.wrapImage}>
                    <Image style={styles.imagegede} source={{uri : `${Host.imageHost}${this.state.webtoonData.coverImage}`}}/>
                </View>
                <View style={{paddingBottom:80}}>
                <FlatList
                    data={this.state.episodeData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailEpisode', {episodeTitle : item.title, episodeId : item._id, webtoonId : this.state.webtoonData._id})}>
                        <View style={styles.wrapContainerFlatlist}>
                            <View style={styles.borderImage}>
                                <Image style={styles.imageDilist} source={{uri : `${Host.imageHost}${item.thumbnail}`}}/>
                            </View>
                            <View style={styles.infoComic}>
                                <Text style={styles.textInfoComic}>Eps.{item.title}</Text>
                                <Text>{item.updatedAt.slice(0,10)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    imagegede : {
        paddingTop : 10 ,
        height : height/3,
        width : '100%'
    },
    wrapImage : {
        width ,
        borderWidth : 2
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
        borderWidth : 2
    },
    infoComic : {
        paddingLeft : 10,
        justifyContent : "center"
    },
    textInfoComic : {
        fontFamily : 'Courgette-Regular',
        fontWeight : 'bold',
        paddingBottom : 10,
        fontSize : 18
    },
    wrapContainerFlatlist : {
        flexDirection: 'row', 
        paddingHorizontal : 40, 
        paddingTop:20
    }
})