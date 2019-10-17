import React, { Component } from 'react';
import { 
    View,
    Dimensions, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Host from '../../environment/Host'

const width = Dimensions.get('window').width
export default class VerticalList extends Component {

    render() {
        return (
            <View>
                {this.props.dataCard.map((item, i) => {
                    if(i < 5) {
                    return (
                <TouchableOpacity key={i} onPress={() => this.props.onPressList(item)}>
                        <View  style={styles.wrapCard}>
                            <Image style={{borderRadius : 5, width: width/5, height:width/5}} source={{uri : `${Host.imageHost}${item.coverImage}`}}/>
                            <View style={styles.wrapSubCard}>
                                <Text style={styles.textTitle}>{item.title}</Text>
                                <Text>{item.episodes} Episodes</Text>
                            </View>
                        </View>
                </TouchableOpacity>
                    )}})
                
            }
            <TouchableOpacity onPress={this.props.onPressAll}>
                <View style={styles.seeAllBtn}>
                    <Text style={{color : 'white'}}>All Webtoon</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
}


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
        fontSize : 18,
        fontWeight : '600',
        paddingBottom : 10
    },
    seeAllBtn : {
        backgroundColor : '#443737',
        alignItems : "center", 
        justifyContent : "center", 
        marginTop : 20,
        padding : 8
    }
})