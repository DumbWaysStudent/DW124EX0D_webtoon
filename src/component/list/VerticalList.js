import React, { Component } from 'react';
import { 
    View,
    Dimensions, 
    FlatList, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { ButtonKecil } from '../button/ButtonLogReg';

const width = Dimensions.get('window').width
export default class VerticalList extends Component {
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
            <View>
                {this.state.dataCard.map((item, i) => {
                    return (
                <TouchableOpacity key={i} onPress={() => this.props.onPressList(item)}>
                        <View  style={styles.wrapCard}>
                            <Image style={{width: width/5, height:width/5}} source={{uri : item.image}}/>
                            <View style={styles.wrapSubCard}>
                                <Text style={styles.textTitle}>{item.title}</Text>
                                <ButtonKecil namaButton="+ Favorite"/>
                            </View>
                        </View>
                </TouchableOpacity>
                    )})
                
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