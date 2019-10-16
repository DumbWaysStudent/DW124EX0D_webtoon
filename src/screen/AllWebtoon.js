import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    TouchableOpacity, 
    Text , 
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Item,
    Input,
    Icon,
    Root,
    Toast
} from 'native-base'
import { connect } from 'react-redux'
import { ButtonKecil } from '../component/button/ButtonLogReg'
import axios from 'axios'
import Host from '../environment/Host'
import { stylesglobe } from '../constant/styles';
import { getUserId, getUserToken } from '../function/api'
import {getUserFav} from '../redux/action/favAction'


const width = Dimensions.get('window').width

class AllWebtoon extends Component {
    constructor() {
        super() 
        this.state= {
            search : '',
            dataSearch: []
        }
    }

    componentDidMount() {
        this.searchByParams()
    }
    
    handleAddFavorit = async(webtoonId) => {
        
        const data = {
            webtoonId
        }
        const userId = await getUserId()
        const userToken = await getUserToken()
        const result = await axios.post(`${Host.localhost}/user/${userId}/favorite`,data, 
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
    searchByParams = async() => {
        const input = this.state.search
        const result = await axios.get(`${Host.localhost}/webtoons/${input}`)
        this.setState({dataSearch : result.data})
    }
    render() {
        return (
            <Root>
            <View style={stylesglobe.background,stylesglobe.paddingContainer}>
                <View style={styles.searchbar}>
                        <Item style={{borderWidth:1}}>
                            <Input
                            placeholder="Search webtoon"
                            onChangeText={text => this.setState({search : text})} 
                            />
                            <Icon onPress={this.searchByParams} name="ios-search" />
                        </Item>
                </View>
                    <FlatList
                    data = {this.state.dataSearch}
                    renderItem={({item}) => 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', {webtoonData : item})}>
                                <View  style={styles.wrapCard}>
                                    <Image style={{width: width/4, height:width/4}} source={{uri : `${Host.imageHost}${item.coverImage}`}}/>
                                    <View style={styles.wrapSubCard}>
                                        <Text style={styles.textTitle}>{item.title}</Text>
                                        <ButtonKecil onPressButton={() => this.handleAddFavorit(item._id)} namaButton="+ Favorite"/>
                                    </View>
                                </View>
                        </TouchableOpacity>
                    }
                    keyExtractor= {(item ,index) => index.toString()}
                        />
            </View>
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
    {getUserFav}
  )(AllWebtoon)

const styles = StyleSheet.create({
    wrapCard : {
        flexDirection : 'row',
        paddingTop : 10
    },
    wrapSubCard : {
        paddingLeft : 10,
        justifyContent : "center"
    },
    textTitle : {
        paddingBottom : 10
    },
    searchbar : {
        paddingBottom : 15
    }
})