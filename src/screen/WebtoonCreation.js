import React, { Component } from 'react';
import { 
    View, 
    Text,
    FlatList,
    Image,
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
 } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome5'
import HeaderComp from '../component/header/HeaderComp';
import { getUserToken, getUserId } from '../function/api';
import { connect } from 'react-redux'
import { getUserWebtoon } from '../redux/action/WebtoonAction'
import Host from '../environment/Host'
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

class WebtoonCreation extends Component {

    async componentDidMount() {
        const userToken = await getUserToken()
        const userId = await getUserId()
        await this.props.getUserWebtoon(userToken, userId)
    }
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp title="My Webtoon" onPressBack={() => this.props.navigation.goBack()}/>
                {this.props.webtoon.isLoading ? 
                <ActivityIndicator/> : 
                this.props.webtoon.webtoonData.length > 0 ? 
                <View style={{flex :1}}>
                <FlatList
                    data={this.props.webtoon.webtoonData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditMyWebtoon', {dataEdit : item})}>
                        <View style={styles.wrapContainerFlatlist}>
                            <View style={styles.borderImage}>
                                <Image style={styles.imageDilist} source={{uri : `${Host.imageHost}${item.coverImage}`}}/>
                            </View>
                            <View style={styles.infoComic}>
                                <Text style={styles.textInfoComic}>{item.title}</Text>
                                <Text>{item.episodes} episode {item.episodes.length > 1 ? <Text>(s)</Text> : null}</Text>
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
                : 
                <View style={{flex : 1,justifyContent :"center", alignItems : "center"}}>
                    <Icon name="book-dead" style={{color : '#443737',fontSize : 80}}/>
                    <Text style={{fontSize: 20}}>
                        Kamu belum memiliki webtoon
                    </Text>
                    <View style={{position:'absolute',bottom:10,alignSelf:'flex-end', padding :25}}>
                    <Icon style={styles.icon} color="#443737" name="plus-circle"
                    onPress={() => this.props.navigation.navigate('CreateWebtoon')}
                    />
                </View>
                </View> }
                
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
    { getUserWebtoon }
  )(WebtoonCreation)

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