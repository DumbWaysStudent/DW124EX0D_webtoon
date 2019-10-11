import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import GuestNavigator from './GuestNavigator'
import MemberNavigator from './MemberNavigator'
import CheckUser from './CheckUser'

const CheckNavigator = createSwitchNavigator({
    GuestNavigator,
    MemberNavigator,
    CheckUser,
},{
    initialRouteName: 'CheckUser'
  }
)

export default createAppContainer(CheckNavigator)