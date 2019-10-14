import React, { Component } from 'react';
import { 
    View, 
    Text,
    FlatList,
    Image,
    StyleSheet, 
    Dimensions,
    TouchableOpacity
 } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome5'
import HeaderComp from '../component/header/HeaderComp';
import { getUserToken, getUserId } from '../function/api';
import axios from 'axios'
import Host from '../environment/Host'
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export default class WebtoonCreation extends Component {
    constructor() {
        super() 
        this.state = {
            data : null
        }
    }

    async componentDidMount() {
        const userToken = await getUserToken()
        const userId = await getUserId()
            if(userToken) {
                const response = await axios.get(`${Host.localhost}/webtoons/${userId}`, 
                        {
                            headers: {"Authorization" : `Bearer ${userToken}`}
                        }
                    )
                this.setState({data : response.data})
            
        }
    }
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp title="My Webtoon" onPressBack={() => this.props.navigation.goBack()}/>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditMyWebtoon', {dataEdit : item})}>
                        <View style={styles.wrapContainerFlatlist}>
                            <View style={styles.borderImage}>
                                <Image style={styles.imageDilist} source={{uri : `${Host.imageHost}${item.episodes[0].episodesContent[0]}`}}/>
                            </View>
                            <View style={styles.infoComic}>
                                <Text style={styles.textInfoComic}>{item.webtoonTitle}</Text>
                                <Text>{item.episodes.length} episode {item.episodes.length > 1 ? <Text>(s)</Text> : null}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{position:'absolute',bottom:10,alignSelf:'flex-end', padding :25}}>
                    <Icon style={styles.icon} color="#443737" name="plus-circle"
                    onPress={() => this.props.navigation.navigate('CreateWebtoon')}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        fontWeight : '600',
        paddingBottom : 10,
        fontSize : 18
    },
    wrapContainerFlatlist : {
        flexDirection: 'row', 
        paddingHorizontal : 40, 
        paddingTop:20
    },
    icon : {
        fontSize : 50,
    }
})