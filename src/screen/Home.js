import React, { Component } from 'react';
import {StatusBar, StyleSheet, View, Text, ScrollView , Dimensions} from 'react-native';
import {
    Item,
    Icon,
    Input,
    Toast,
    Root
} from 'native-base'
import SliderImage from '../component/imageslider/SliderImage'
import { stylesglobe } from '../constant/styles';
import CardHorizontal from '../component/list/CardHorizontal';
import VerticalList from '../component/list/VerticalList';

import {connect} from 'react-redux'
import {getAllWebtoon} from '../redux/action/allAction'
import {getUserFav} from '../redux/action/favAction'

import Axios from 'axios';
import { getUserId, getUserToken } from '../function/api'
import Host from '../environment/Host';

const height = Dimensions.get("window").height
class Home extends Component {
    constructor() {
        super() 
        this.state = {
            latestWebtoon : []
        }
    }
    async componentDidMount() {
        const result = await Axios.get(`${Host.localhost}/sortByDate`)
        this.setState({latestWebtoon : result.data})
        await this.props.getAllWebtoon()
        
    }
    handleAddFavorit = async(webtoonId) => {
        
        const data = {
            webtoonId
        }
        const userId = await getUserId()
        const userToken = await getUserToken()
        const result = await Axios.post(`${Host.localhost}/user/${userId}/favorite`,data, 
                    { headers: {"Authorization" : `Bearer ${userToken}`}}
                    )
        let toasttype;
        if(result.status == 201){
            toasttype = "success"
        } else {
            toasttype = "danger"
        }
        Toast.show({
            text: result.data,
            buttonText: 'Okay',
            type : toasttype
        })
        await this.props.getUserFav(userId, userToken)
        
        
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
                            <Text>See all</Text>
                        </View>
                        <View style={styles.listhorizontal}>
                            <CardHorizontal dataCard={this.state.latestWebtoon} onPressCard={(item) => navigation.navigate('DetailWebtoon', {webtoonData : item})}/>
                        </View>
                    </View>
                    <View style={styles.contFav}>
                        <View style={styles.wrapduajauh}>
                            <Text style={styles.category}>All</Text>
                            <Text onPress={()=> this.props.navigation.navigate("AllWebtoon")}>See all</Text>
                        </View>
                        <View style={styles.verticalList}>
                            <VerticalList handlePressFav={(item) => this.handleAddFavorit(item)} dataCard={this.props.allWebtoon} onPressList={(item) => navigation.navigate('DetailWebtoon', {webtoonData : item})}/>
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
      allWebtoon: state.allReducer.allWebtoon
    };
  }


export default connect(
    mapStateToProps,
    { getAllWebtoon , getUserFav}
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
