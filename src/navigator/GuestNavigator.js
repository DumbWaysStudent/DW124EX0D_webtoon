import { createAppContainer } from 'react-navigation'
import { createStackNavigator }  from 'react-navigation-stack'

import Login from '../screen/mainscreen/beforelogin/Login'
import Register from '../screen/mainscreen/beforelogin/Register'

const GuestNavigator = createStackNavigator({
    Login : {
        screen : Login,
        navigationOptions : {
            header : null
        }
    }, 
    Register : {
        screen : Register,
        navigationOptions : {
            header : null
        }
    }
})

export default createAppContainer(GuestNavigator)