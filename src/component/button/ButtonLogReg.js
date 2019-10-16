import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    Button,
    Text,
} from 'native-base'

export class ButtonLogReg extends Component {
    render() {
        return (
            <Button disabled={this.props.disabled} style={styles.btnText} onPress={this.props.onPressButton}>
                <Text>
                    {this.props.btnTitle}
                </Text>
            </Button>
        );
    }
}

export class ButtonKecil extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressButton}>
                <View style={styles.buttonKecil}>
                    <Text style={{fontSize : 12,color: 'white' }}>  {this.props.namaButton}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }
}

const styles = StyleSheet.create({
    btnText : {
        justifyContent : "center",
        borderRadius : 10,
        backgroundColor : '#443737'
    },
    buttonKecil : {
        width:70, 
        alignItems:"center" ,
        backgroundColor:'red',
        borderRadius: 5,
        height : 30,
        justifyContent : "center"
    }
})