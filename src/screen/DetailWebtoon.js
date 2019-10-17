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
            episodeData : [],
            updatedAt : '',
            author : ''
        }
    }
    async componentDidMount() {
        const {webtoonData} = this.props.navigation.state.params
        const author = webtoonData.createdBy.fullname
        const episodeData = await getEpisode(webtoonData._id)
        this.setState({updatedAt : webtoonData.updatedAt.slice(0,10)})
        this.setState({episodeData, webtoonData, author})
    }
    onSharePress = () => Share.share(shareOptions);

    render() {
        const {webtoonData} = this.state     
        return (
            <View style={{flex : 1}}>
                <HeaderComp 
                iconDua={true} iconDuaName="share" pressIconDua={this.onSharePress} 
                title={this.state.webtoonData.title} onPressBack={() => this.props.navigation.goBack()}/>
                <View style={{flex : 1}}>
                <View style={styles.wrapInfo}>
                    <View style={{flex : 2}}>
                        <Image style={styles.imagegede} source={{uri : `${Host.imageHost}${this.state.webtoonData.coverImage}`}}/>
                    </View>
                    <View style={{flex : 3, paddingHorizontal : 15}}>
                        <Text style={styles.textTitle}>{webtoonData.title}</Text>
                        <View style={{paddingTop : 20}}>
                            <View style={{ flexDirection : "row", justifyContent : "space-between"}}>
                                <Text style={styles.subTitle}>Author : </Text>
                                <Text style={styles.subTitle}>{this.state.author}</Text>
                            </View>
                            <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                                <Text style={styles.subTitle}>Genre :</Text>
                                <Text style={styles.subTitle}>{webtoonData.genre}</Text>
                            </View>
                            <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                                <Text style={styles.subTitle}>Last update :</Text>
                                <Text style={styles.subTitle}>{this.state.updatedAt}</Text>
                            </View>
                            <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                                <Text style={styles.subTitle}>Episode : </Text>
                                <Text style={styles.subTitle}>{webtoonData.episodes}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{paddingBottom:80}}>
                <Text style={{fontFamily:'Montserrat-SemiBold',
                        fontSize:18,
                        paddingLeft : 20}}>Episode List</Text>
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
        height : height/4,
        width :'100%',
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10
    },
    wrapInfo : {
        flexDirection : "row",
        margin : 15,
        borderWidth : 1,
        borderRadius : 10,
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
    },
    textTitle : {
        fontSize : 23,
        fontFamily : 'OpenSans-SemiBold'
    },
    subTitle : {
        fontFamily : 'Montserrat-SemiBold',
        fontWeight : '400'
    }
})