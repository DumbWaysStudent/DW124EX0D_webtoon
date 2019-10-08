import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView , Dimensions , FlatList, Image} from 'react-native';
import {
    Container,
    Item,
    Icon,
    Input
} from 'native-base'
import ImageAutoChange from '../../../component/imageslider/ImageAutoChange';
import { stylesglobe } from '../../../constant/styles';
import CardHorizontal from '../../../component/cardhorizontal/CardHorizontal';


const height = Dimensions.get("window").height
export default class Home extends Component {
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
            <ScrollView>
                <Container style={[styles.container, stylesglobe.background]}>
                    <View>
                        <Item style={{borderWidth:1}}>
                            <Input
                            placeholder="Search" />
                            <Icon name="ios-search" />
                        </Item>
                    </View>
                    <ImageAutoChange/>
                    <View style={styles.contFav}>
                        <View style={styles.wrapduajauh}>
                            <Text style={styles.category}>Favorite</Text>
                            <Icon name="arrow-forward"/>
                        </View>
                    <View style={styles.listhorizontal}>
                    <FlatList
                    data={this.state.dataCard}
                    horizontal={true}
                    renderItem={({item}) =>
                    <View>
                        <Image style={{width: 100, height:100}} source={{uri : item.image}}/>
                        <Text style={{fontSize: 20, textAlign: 'center'}}>{item.title}</Text>
                    </View>
                    
                    } 
                        keyExtractor={(item, index) => index.toString()} 
                        />
                    </View>
                    </View>
                </Container>
            </ScrollView>
           
        );
    }
}

const styles = StyleSheet.create({
    container : {
        padding : 20
    },
    category : {
        fontFamily:'Montserrat-SemiBold',
        fontSize:20
    },
    wrapduajauh : {
        flexDirection: 'row',
        alignItems : "center",
        justifyContent : "space-between"
    },
    contFav : {
        paddingVertical : 15
    },
    listhorizontal : {
        width : '100%'
    }
})
