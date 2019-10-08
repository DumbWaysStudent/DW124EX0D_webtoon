import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

import BottomTabNavigator from './BottomTabNavigator'
import DetailWebtoon from './../screen/subscreen/DetailWebtoon'


const MemberNavigator = createStackNavigator({
    BottomTabNavigator : {
        screen : BottomTabNavigator,
        navigationOptions :{
            header : null
        }
    },
    DetailWebtoon : {
        screen : DetailWebtoon,
        navigationOptions : {
            header : null
        }
    }
})



export default createAppContainer(MemberNavigator)