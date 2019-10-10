import React, { Component } from 'react';
import {StatusBar, StyleSheet, View, Text, ScrollView , Dimensions} from 'react-native';
import {
    Container,
    Item,
    Icon,
    Input
} from 'native-base'
import ImageAutoChange from '../component/imageslider/ImageAutoChange';
import { stylesglobe } from '../constant/styles';
import CardHorizontal from '../component/list/CardHorizontal';
import VerticalList from '../component/list/VerticalList';


const height = Dimensions.get("window").height
export default class Home extends Component {
    constructor() {
        super() 
        this.state = {

        }
    }
    render() {
        const { navigation } = this.props

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                backgroundColor="#443737" />
                <View style={[styles.container, stylesglobe.background]}>
                    <View style={styles.searchbar}>
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
                            <CardHorizontal onPressCard={(item) => navigation.navigate('DetailWebtoon', {dataKomik : item})}/>
                        </View>
                    </View>
                    <View style={styles.contFav}>
                        <View style={styles.wrapduajauh}>
                            <Text style={styles.category}>All</Text>
                            <Text>See all</Text>
                        </View>
                        <View style={styles.verticalList}>
                            <VerticalList onPressList={(item) => navigation.navigate('DetailWebtoon', {dataKomik : item})}/>
                        </View>
                    </View>
                </View>
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
        width : '100%',
        paddingTop:10
    },
    searchbar : {
        paddingBottom : 15
    }
})