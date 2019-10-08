import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    Text,
    Image,
    StyleSheet
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
        return (
                <FlatList
                data = {this.state.dataCard}
                horizontal={true}
                renderItem={({item}) => {
                    <View>
                        <Image style={styles.imagelist} source={{uri : item.image}}/>
                        <Text>{item.title}</Text>
                    </View>
                }}
                keyExtractor={(item, index) => index.toString()} 
                />
        );
    }
}

const styles = StyleSheet.create({
    imagelist : {
        height :'90%' ,
        width : '30%'
    }
})