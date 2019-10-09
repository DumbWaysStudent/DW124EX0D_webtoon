import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

import BottomTabNavigator from './BottomTabNavigator'
import DetailWebtoon from './../screen/subscreen/DetailWebtoon'
import DetailEpisode from './../screen/subscreen/DetailEpisode'
import WebtoonCreation from './../screen/subscreen/WebtoonCreation'
import CreateWebtoon from '../screen/subscreen/CreateWebtoon'
import NewEpisode from '../screen/subscreen/NewEpisode'
import EditMyWebtoon from '../screen/subscreen/EditMyWebtoon'





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
    },
    DetailEpisode  : {
        screen : DetailEpisode,
        navigationOptions : {
            header : null
        }
    },
    WebtoonCreation : {
        screen : WebtoonCreation,
        navigationOptions : {
            header : null
        }
    },
    CreateWebtoon : {
        screen : CreateWebtoon,
        navigationOptions : {
            header : null
        }
    },
    NewEpisode : {
        screen : NewEpisode,
        navigationOptions : {
            header : null
        }
    },
    EditMyWebtoon : {
        screen : EditMyWebtoon,
        navigationOptions : {
            header : null
        }
    }
})



export default createAppContainer(MemberNavigator)