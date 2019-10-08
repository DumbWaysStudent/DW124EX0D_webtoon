import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    Text
} from 'native-base'

export default class ButtonLogReg extends Component {
    render() {
        return (
            <Button success style={styles.btnText}onPress={this.props.onPressButton}>
                <Text>
                    {this.props.btnTitle}
                </Text>
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    btnText : {
        justifyContent : "center",
        borderRadius : 10
    }
})