import React, { Component } from 'react';
import { 
    View, 
    FlatList,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {
    Item,
    Icon,
    Input,

} from 'native-base'

import {connect} from 'react-redux'
import {getUserFav} from '../redux/action/favAction'
import { getUserId, getUserToken } from '../function/api';
import Host from '../environment/Host';
import Axios from 'axios';
const width = Dimensions.get("window").width

class Favorit extends Component {
    constructor() {
        super() 
        this.state = {
            filter : '',
        }
    }

     componentDidMount() {
        this.refreshUserFav()
    }

    refreshUserFav = async () => {
        const userId = await getUserId()
        const userToken = await getUserToken()
        await this.props.getUserFav(userId, userToken)
    }
    handleDeleteFav = async (favoritId) => {
        const userId = await getUserId()
        const userToken = await getUserToken()
        await Axios.delete(`${Host.localhost}/user/${userId}/favorite/${favoritId}`, 
        { headers: {"Authorization" : `Bearer ${userToken}`}}
        )
        this.refreshUserFav()
    }
    render() {
        return (

            <View style={styles.container}>
                <StatusBar
                backgroundColor="#443737" />
                <View style={styles.searchbar}>
                        <Item>
                            <Input
                            onChangeText={(text) => this.setState({filter : text})}
                            placeholder="Search" />
                            <Icon name="ios-search" />
                        </Item>
                </View>
                <FlatList
                    data={this.props.userFav.favoritData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    // {item.title.toLowerCase().}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', {webtoonData : item.webtoonId})}>
                        <View style={[styles.wrapContainerFlatlist, {justifyContent : "space-between"}]}>
                            <View style={styles.wrapContainerFlatlist}>
                                <View style={styles.borderImage}>
                                    <Image style={styles.imageDilist} source={{uri : `${Host.imageHost}${item.webtoonId.coverImage}`}}/>
                                </View>
                                <View style={styles.infoComic}>
                                    <Text style={styles.textInfoComic}>{item.webtoonId.title}</Text>
                                    <Text>80 Favourite</Text>
                                </View>
                            </View>
                            <View style={{justifyContent : "center"}}>
                                <Icon onPress={() => this.handleDeleteFav(item._id)} name="star" style={{color : "red"}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    />
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
      userFav: state.favoriteReducer
    };
  }


export default connect(
    mapStateToProps,
    { getUserFav }
  )(Favorit)


const styles= StyleSheet.create({
    container : {
        flex : 1,
        padding : 20
    },
    searchbar : {
        paddingBottom : 5,
    },
    imageDilist : {
        width : width/4,
        height : width/4,
    },
    wrapContainerFlatlist : {
        flexDirection: 'row', 
        paddingTop:8
    },
    infoComic : {
        paddingLeft : 10,
        justifyContent : "space-around",
    },
})