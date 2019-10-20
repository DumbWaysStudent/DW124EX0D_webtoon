import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import {
    Item,
    Label,
    Input,
    Icon,
} from 'native-base'
import { InputTextX } from '../component/Input/Input';
import { stylesglobe } from '../constant/styles';
import {ButtonLogReg} from '../component/button/ButtonLogReg';
import { emailvalid } from '../function/validation';

import AsyncStorage from '@react-native-community/async-storage'
import jwt from "react-native-pure-jwt";
import axios from 'axios'
import Host from '../environment/Host'


export default class Login extends Component {
    constructor() {
        super() 
        this.state = {
            email : '',
            password : '',
            iconpsw : "ios-eye-off",
            shwhidepsw: true,
            errorMsg : ''
        }
    }

    _handlePswIcon = () => {
        if(this.state.iconpsw === "ios-eye") {
            this.setState({iconpsw : "ios-eye-off", shwhidepsw:true})
        }else {
            this.setState({iconpsw : "ios-eye", shwhidepsw:false})
        }
    }
    _handleLogin = async() => {
        try {
        const loginData = {
            email : this.state.email,
            password : this.state.password
        }
        const user = await axios.post(`${Host.localhost}/login` , loginData)
        if(user) {
            await AsyncStorage.setItem('userToken', user.data );
                const objJwt = await jwt.decode(
                user.data, // the token
                'webtoonclone', // the secret
                {
                    skipValidation: true // to skip signature and exp verification
                }
                );
                await AsyncStorage.setItem('userId',JSON.stringify(objJwt.payload.userId));
                this.props.navigation.navigate('MemberNavigator')
            }
        }
        catch(error) {
                this.setState({errorMsg : "Username atau password salah"})
            }
    }

    render() {
        return (
            <View style={[stylesglobe.background, stylesglobe.paddingContainer, {flex :1}]}>
                <View style={{flex : 3}}>
                    <Image style={styles.imageLogo} source={require('../assets/image/logo.jpg')} />
                </View>
                <View style={styles.wrapformfield}>
                    <InputTextX 
                    value={this.state.email}
                    handleChangeText={text => this.setState({email : text})}
                    secured={false}
                    keyboardType="email-address" icon={true} iconName="person" label="Email"/>
                    <Item floatingLabel>
                            <Icon name="ios-lock" style={styles.iconLock}/>
                            <Label>Password</Label>
                            <Input 
                            value={this.state.password}
                            autoCapitalize="none"
                            keyboardType="default"
                            secureTextEntry={this.state.shwhidepsw}
                            onChangeText={(text)=> this.setState({password: text})}
                            />
                            <Icon onPress={this._handlePswIcon} name={this.state.iconpsw} />
                        </Item>
                <Text style={{color : 'red'}}>{this.state.errorMsg}</Text>
                </View>
                <View style={styles.wrapBtn}>
                    <View style={styles.wrapLupa}>
                        <Text style={styles.lupasandi} onPress={() => alert('Lupa kata sandi')}>
                            Lupa kata sandi ?
                        </Text>
                    </View>
                    <ButtonLogReg disabled={emailvalid(this.state.email) ? this.state.password != "" ? false : true : true} 
                    btnTitle="Login" 
                    onPressButton={this._handleLogin}/>
                </View>
                <View style={{flex : 1, alignItems : "center"}}>
                    <Text>
                        Belum punya akun ? 
                        <Text style={styles.textDaftar} onPress={() => this.props.navigation.navigate('Register')}>Daftar</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapformfield : {
        padding : 40,
        flex : 1
    },
    imageLogo : {
        width : '100%',
        height : "100%"
    },
    lupasandi : {
        color : "blue",
        // fontFamily : 'Montserrat-black'
    },
    wrapBtn : {
        padding : 20,
        flex : 1
    },
    wrapLupa : {
        alignItems : "flex-end",
        paddingBottom : 10
    },
    textDaftar : {
        color : 'blue'
    },
    iconLock : {
        paddingRight : 10,
        paddingBottom : 10
    }
})