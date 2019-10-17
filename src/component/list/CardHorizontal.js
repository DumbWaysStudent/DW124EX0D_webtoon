import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Host from '../../environment/Host'

export default class CardHorizontal extends Component {
    render() {
        return (
            <View >
            <FlatList
            data={this.props.dataCard}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.props.onPressCard(item)}>
                <View style={{marginRight : 5}}>
                    <Image style={styles.imagelist} source={{uri : `${Host.imageHost}${item.coverImage}`}}/>
                    <View style={{width : 150}}>
                        <Text style={{ textAlign: 'left'}}>{item.title}</Text>
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
        height:130,
        borderRadius : 5
    }
})