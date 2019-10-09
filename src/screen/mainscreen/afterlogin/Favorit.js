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
    Input
} from 'native-base'

const width = Dimensions.get("window").width

export default class Favorit extends Component {
    constructor() {
        super() 
        this.state = {
            dataCard :  [{
                title: 'The Secret of Angel',
                image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
          }, {
                title: 'Pasutri Gaje',
                image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
          }, {
                title: 'Young Mom',
                image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
          }]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                backgroundColor="#443737" />
                <View style={styles.searchbar}>
                        <Item style={{borderWidth:1}}>
                            <Input
                            placeholder="Search" />
                            <Icon name="ios-search" />
                        </Item>
                </View>
                <FlatList
                    data={this.state.dataCard}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailEpisode', {dataEpisode : item})}>
                        <View style={styles.wrapContainerFlatlist}>
                            <View style={styles.borderImage}>
                                <Image style={styles.imageDilist} source={{uri : item.image}}/>
                            </View>
                            <View style={styles.infoComic}>
                                <Text style={styles.textInfoComic}>{item.title}</Text>
                                <Text>80 Favourite</Text>
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

const styles= StyleSheet.create({
    container : {
        flex : 1,
        padding : 20
    },
    searchbar : {
        paddingBottom : 15,
    },
    imageDilist : {
        width : width/4,
        height : width/4,
    },
    wrapContainerFlatlist : {
        flexDirection: 'row', 
        paddingTop:20
    },
    infoComic : {
        paddingLeft : 10,
        justifyContent : "center"
    },
})