import React, { Component } from 'react';
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
            <Header style={{backgroundColor : '#443737'}}>
                <Left>
                    <Button transparent onPress={this.props.onPressBack} >
                        <Icon  name="ios-arrow-round-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontFamily: 'OpenSans-SemiBold'}}>{this.props.title}</Title>
                </Body>
                {this.props.iconShare ? 
                <Right>
                    <Icon color="white" name="share" onPress={this.props.pressIconShare}/>
                </Right>
                : null}
            </Header>
        );
    }
}