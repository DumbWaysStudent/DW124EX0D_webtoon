import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Item,
    Label,
    Input,
    Icon,
} from 'native-base'

export class InputTextX extends Component {
    render() {
        return (
            <Item floatingLabel style={{borderColor:'grey'}}>
                {this.props.icon ? <Icon style={styles.iconkecil} name={this.props.iconName}/> : null}
                <Label>{this.props.label}</Label>
                <Input
                value={this.props.value}               
                keyboardType={this.props.keyboardType}
                onChangeText={this.props.handleChangeText}
                style={{ height:60}}
                secureTextEntry={this.props.secured}
                />
            </Item>
        );
    }
}

export class InputNumberX extends Component {
    constructor() {
        super() 
        this.state= {
            color : 'black'
        }
    }
    onFocus = () => {
        this.setState({
            color: 'green'
        })
      }
    
    onBlur = ()  => {
        this.setState({
          color: 'black'
        })
      }
    render() {
        return (
            <Item floatingLabel style={{borderColor:'grey'}}>
                {this.props.icon ? <Icon style={styles.iconkecil} name={this.props.iconName}/> : null}
                <Label>{this.props.label}</Label>
                <Input
                // value={this.props.value}
                onBlur={ () => this.onBlur() }
                onFocus={ () => this.onFocus() }                
                keyboardType="number-pad"
                // onChangeText={this.props.handleChangeText}
                style={{ height:60, color: this.state.color}}
                />
            </Item>
        );
    }
}

const styles = StyleSheet.create({
    iconkecil : {
        paddingRight : 10,
        paddingBottom : 10
    } 
})