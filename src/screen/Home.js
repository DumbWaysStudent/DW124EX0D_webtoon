import React, { Component } from 'react';
import {StatusBar, StyleSheet, View, Text, ScrollView , Dimensions} from 'react-native';
import {
    Item,
    Icon,
    Input,
    Root
} from 'native-base'
import SliderImage from '../component/imageslider/SliderImage'
import { stylesglobe } from '../constant/styles';
import CardHorizontal from '../component/list/CardHorizontal';
import VerticalList from '../component/list/VerticalList';

import {connect} from 'react-redux'
import {getAllWebtoon, getLatestWebtoon} from '../redux/action/allAction'

class Home extends Component {
    async componentDidMount() {
        await this.props.getLatestWebtoon()
        await this.props.getAllWebtoon()   
    }
    render() {
        const { navigation } = this.props

        return (
            <Root>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                backgroundColor="#443737" />
                <View style={[styles.container, stylesglobe.background]}>
                    <View style={styles.searchbar}>
                        <Item style={{borderWidth:1}}>
                            <Input
                            onFocus={() =>
                                this.props.navigation.navigate("AllWebtoon", {
                                  autoFocus: true
                                })}
                            placeholder="Search" />
                            <Icon name="ios-search" />
                        </Item>
                    </View>
                    <SliderImage/>
                    <View style={styles.contFav}>
                        <View style={styles.wrapduajauh}>
                            <Text style={styles.category}>Latest Upload!</Text>
                        </View>
                        <View style={styles.listhorizontal}>
                            <CardHorizontal dataCard={this.props.latestWebtoon} onPressCard={(item) => navigation.navigate('DetailWebtoon', {webtoonData : item})}/>
                        </View>
                    </View>
                    <View style={styles.contFav}>
                        <View style={styles.wrapduajauh}>
                            <Text style={styles.category}>All</Text>
                            <Text onPress={()=> this.props.navigation.navigate("AllWebtoon")}>See all</Text>
                        </View>
                        <View style={styles.verticalList}>
                            <VerticalList dataCard={this.props.allWebtoon} onPressList={(item) => navigation.navigate('DetailWebtoon', {webtoonData : item})}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            </Root>
           
        );
    }
}

function mapStateToProps(state) {
    return {
      allWebtoon: state.allReducer.allWebtoon,
      latestWebtoon : state.allReducer.latestWebtoon
    };
  }


export default connect(
    mapStateToProps,
    { getAllWebtoon, getLatestWebtoon }
  )(Home)

const styles = StyleSheet.create({
    container : {
        padding : 20
    },
    category : {
        fontFamily:'Montserrat-SemiBold',
        fontSize:18
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
