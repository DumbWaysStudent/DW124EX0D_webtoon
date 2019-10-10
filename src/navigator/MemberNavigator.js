import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

import BottomTabNavigator from './BottomTabNavigator'
import DetailWebtoon from './../screen/DetailWebtoon'
import DetailEpisode from './../screen/DetailEpisode'
import WebtoonCreation from './../screen/WebtoonCreation'
import CreateWebtoon from '../screen/CreateWebtoon'
import NewEpisode from '../screen/NewEpisode'
import EditMyWebtoon from '../screen/EditMyWebtoon'
import EditEpisodeScreen from '../screen/EditEpisodeScreen'





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
    },
    EditEpisodeScreen : {
        screen : EditEpisodeScreen,
        navigationOptions : {
            header : null
        }
    },
})



export default createAppContainer(MemberNavigator)