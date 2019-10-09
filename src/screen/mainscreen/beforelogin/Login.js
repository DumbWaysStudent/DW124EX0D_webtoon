import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Text 
} from 'react-native';

import {
    Item,
    Label,
    Input,
    Icon,
} from 'native-base'
import { InputTextX } from '../../../component/Input/Input';
import { stylesglobe } from '../../../constant/styles';
import {ButtonLogReg} from '../../../component/button/ButtonLogReg';
import { emailvalid } from '../../../function/validation';


export default class Login extends Component {
    constructor() {
        super() 
        this.state = {
            email : '',
            password : '',
            iconpsw : "ios-eye-off",
            shwhidepsw: true
        }
    }

    _handlePswIcon = () => {
        if(this.state.iconpsw === "ios-eye") {
            this.setState({iconpsw : "ios-eye-off", shwhidepsw:true})
        }else {
            this.setState({iconpsw : "ios-eye", shwhidepsw:false})
        }
    }
    // _handleLogin = async() => {
    //     const loginData = {
    //         email : this.state.email,
    //         password : this.state.password
    //     }
    //     const x = await axios.post(`${Host}/auth` , loginData)

        
    // }

    render() {
        const {navigation} = this.props
        return (
            <View style={[stylesglobe.background, stylesglobe.paddingContainer, {flex :1}]}>
                <View style={{flex : 3}}>
                    <Image style={styles.imageLogo} source={require('../../../assets/image/logo.png')} />
                </View>
                <View style={styles.wrapformfield}>
                    <InputTextX 
                    value={this.state.email}
                    handleChangeText={text => this.setState({email : text})}
                    secured={false}
                    keyboardType="email-address" icon={true} iconName="person" label="Username"/>
                    <Item floatingLabel>
                            <Icon name="ios-lock" style={styles.iconLock}/>
                            <Label>Password</Label>
                            <Input 
                            autoCapitalize="none"
                            keyboardType="default"
                            secureTextEntry={this.state.shwhidepsw}
                            onChangeText={(text)=> this.setState({password: text})}
                            />
                            <Icon onPress={this._handlePswIcon} name={this.state.iconpsw} />
                        </Item>
                </View>
                <View style={styles.wrapBtn}>
                    <View style={styles.wrapLupa}>
                        <Text style={styles.lupasandi} onPress={() => alert('Lupa kata sandi')}>
                            Lupa kata sandi ?
                        </Text>
                    </View>
                    <ButtonLogReg disabled={emailvalid(this.state.email) ? false : true} btnTitle="Login" onPressButton={() => navigation.navigate('Home')}/>
                </View>
                <View style={{flex : 1, alignItems : "center"}}>
                    <Text>
                        Belum punya akun ? 
                        <Text style={styles.textDaftar} onPress={() => navigation.navigate('Register')}>Daftar</Text>
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