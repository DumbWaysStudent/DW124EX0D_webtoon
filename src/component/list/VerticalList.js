import React, { Component } from 'react';
import { 
    View,
    Dimensions, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { ButtonKecil } from '../button/ButtonLogReg';

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
                            <Image style={{borderRadius : 5, width: width/4, height:width/4}} source={{uri : `${Host.imageHost}${item.coverImage}`}}/>
                            <View style={styles.wrapSubCard}>
                                <Text style={styles.textTitle}>{item.title}</Text>
                                <ButtonKecil onPressButton={() => this.props.handlePressFav(item._id)} namaButton="+ Favorite"/>
                            </View>
                        </View>
                </TouchableOpacity>
                    )}})
                
            }
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
        paddingBottom : 10
    }
})