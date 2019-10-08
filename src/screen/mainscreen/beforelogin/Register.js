import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Dimensions, 
    Text 
} from 'react-native';

import { InputTextX } from '../../../component/Input/Input';
import { stylesglobe } from '../../../constant/styles';
import ButtonLogReg from '../../../component/button/ButtonLogReg';


const height = Dimensions.get('window').height
export default class Login extends Component {
    constructor() {
        super() 
        this.state = {
            email : '',
            password : ''
        }
    }
    render() {
        const {navigation} = this.props
        return (
            <View style={[stylesglobe.background, stylesglobe.paddingContainer, {flex :1}]}>
                <View style={{flex : 2}}>
                    <Image style={styles.imageLogo} source={require('../../../assets/image/logo.png')} />
                </View>
                <View style={styles.wrapformfield}>
                    <InputTextX keyboardType="email-address" icon={true} iconName="mail-open" label="Email"/>
                    <InputTextX keyboardType="default" icon={true} iconName="person" label="Username"/>
                    <InputTextX keyboardType="default" icon={true} iconName="lock" label="Password"/>
                    
                </View>
                <View style={styles.wrapBtn}>
                    <ButtonLogReg btnTitle="Daftar" onPressButton={() => alert('Daftar')}/>
                </View>
                <View style={{flex : 1, alignItems : "center"}}>
                    <Text>
                        Sudah punya akun ? 
                        <Text style={styles.textLogin} onPress={() => navigation.navigate('Login')}>Login</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapformfield : {
        padding : 40,
        flex : 2
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
    textLogin : {
        color : 'blue'
    }
})