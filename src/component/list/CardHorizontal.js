import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class CardHorizontal extends Component {
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
        // const { navigation } = this.props
        return (
            <View >
            <FlatList
            data={this.state.dataCard}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.props.onPressCard(item)}>
                <View style={styles.list}>
                    <Image style={styles.imagelist} source={{uri : item.image}}/>
                    <View style={{width : 150}}>
                        <Text style={{ textAlign: 'center'}}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()
            }/>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    imagelist : {
        width: '100%', 
        height:150
    }
})