import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
import {
    Button
} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import HeaderComp from '../component/header/HeaderComp';

import { newEpisode } from '../function/api';


const width = Dimensions.get('window').width

export default class NewEpisode extends Component {
    constructor() {
        super() 
        this.state = {
            title : '',
            contentImage : [],
            webtoonId : ''
        }
    }
    componentDidMount() {
        const {webtoonId} = this.props.navigation.state.params
        this.setState({webtoonId})
    }
    handleDeletePhoto = (item) => {
        const indexItem = this.state.contentImage.indexOf(item)
        this.state.contentImage.splice(indexItem, 1)
        this.setState({})
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({
            multiple: true
          }).then(images => {
            console.log(images);
            images.map((image, id) => {
                this.state.contentImage.push(image.path)
            });
           
            this.setState({});
          });
        };

    _handleFinishNewEpisode = async () => {
        const {contentImage , title} = this.state
        if(contentImage.length === 0 || title === "") {
            alert("Isi semua field")
        }
        else {
            await newEpisode(this.state)
            this.props.navigation.state.params.updateData();
            this.props.navigation.goBack()
        }
  
    }
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp 
                iconDua={true} iconDuaName="checkmark" pressIconDua={this._handleFinishNewEpisode}
                title="Create Episode" onPressBack={() => this.props.navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.titleStyle}>Episode</Text>
                        <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        keyboardType="numeric"
                        onChangeText={text => this.setState({ title : text})}
                        value={this.state.title}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleStyle}>Add Images</Text>
                       
                    </View>
                    <FlatList
                        data={this.state.contentImage}
                        renderItem={({ item }) => 
                        <View style={{paddingBottom :5}}>
                            <View style={{flexDirection : "row"}}>
                                <Image style={styles.imageList} source={{uri : item}} />
                                <View style={{justifyContent : "center", marginLeft : 10}}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    <View style={{width : 100}}>
                                    <Button onPress={() => this.handleDeletePhoto(item)} danger style={{borderRadius : 10 ,justifyContent : "center"}}>
                                        <Text style={{color : 'white'}}>Delete</Text>
                                    </Button>
                                    </View>
                                 </View>
                            </View>
                        </View>   
                    }
                        keyExtractor={(item,index) => index.toString()}
                        />
                    <Button onPress={this.handleChoosePhoto} style={styles.btn}>
                        <Text style={styles.txtBtn}>+ IMAGE</Text>
                    </Button>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyContainer : {
        padding : 30,
        flex : 1
    },
    titleStyle : {
        fontFamily : 'Montserrat-SemiBold',
        fontSize : 20
    },
    imageList : {
        width : width/5,
        height : width/5
    },
    btn : {
        justifyContent : "center",
        backgroundColor : '#443737',
        marginTop : 20
    },
    txtBtn : {
        color : "white"
    }
})