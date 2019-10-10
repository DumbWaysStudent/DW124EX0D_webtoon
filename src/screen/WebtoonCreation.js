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

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export default class WebtoonCreation extends Component {
    constructor() {
        super() 
        this.state = {
            data : [{
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
                                <Image style={styles.imageDilist} source={{uri : item.image}}/>
                            </View>
                            <View style={styles.infoComic}>
                                <Text style={styles.textInfoComic}>{item.title}</Text>
                                <Text>{item.episodes}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{position:'absolute',bottom:0,alignSelf:'flex-end'}}>
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
        borderWidth : 4
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
    icon : {
        fontSize : 60,
    }
})