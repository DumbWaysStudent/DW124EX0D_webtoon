import React, { Component } from 'react';
import { 
    StatusBar
 } from 'react-native';
import {
    Header ,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right
} from 'native-base'

export default class HeaderComp extends Component {
    render() {
        return (
            <Header androidStatusBarColor="#443737" style={{ backgroundColor : '#443737'}}>
                <Left>
                    <Button transparent onPress={this.props.onPressBack} >
                        <Icon  name="ios-arrow-round-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontFamily: 'OpenSans-SemiBold'}}>{this.props.title}</Title>
                </Body>
                {this.props.iconDua ? 
                <Right>
                    <Icon style={{color : 'white'}} name={this.props.iconDuaName} onPress={this.props.pressIconDua}/>
                </Right>
                : null}
            </Header>
        );
    }
}