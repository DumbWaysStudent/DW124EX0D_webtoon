import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import GuestNavigator from './GuestNavigator'
import MemberNavigator from './MemberNavigator'


const CheckNavigator = createSwitchNavigator({
    GuestNavigator,
    MemberNavigator
})

export default createAppContainer(CheckNavigator)