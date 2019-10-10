import { createAppContainer } from 'react-navigation'
import { createStackNavigator }  from 'react-navigation-stack'

import Login from '../screen/Login'
import Register from '../screen/Register'

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