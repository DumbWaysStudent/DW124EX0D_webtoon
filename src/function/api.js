import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import Host from '../environment/Host'

export const getUser = async() => {
    const userDataJSON = await AsyncStorage.getItem('userData')
    const userParse = JSON.parse(userDataJSON)
    const userId = userParse._id
    const userData = await axios.get(`${Host.localhost}/users/${userId}`)
    return userData.data    
}
export const getUserId = async() => {
    const userDataJSON = await AsyncStorage.getItem('userData')
    const userParse = JSON.parse(userDataJSON)
    const userId = userParse._id
    return userId 
}


export const editProfileFunc = async(formData) => {
    const userDataJSON = await AsyncStorage.getItem('userData')
    const userParse = JSON.parse(userDataJSON)
    const userId = userParse._id
    const newUserData = await axios.put(`${Host.localhost}/users/${userId}`, formData)
    return newUserData
}