import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import Host from '../environment/Host'

export const getUserToken = async() => {
    const userToken = await AsyncStorage.getItem('userToken')
    return userToken   
}
export const getUserId = async() => {
    const userIdJSON = await AsyncStorage.getItem('userId')
    const userId = JSON.parse(userIdJSON)
    return userId 
}


export const editProfileFunc = async(formData) => {
    const userToken = await getUserToken()
    if(userToken) {
        const newUserData = await axios.put(`${Host.localhost}/user`, 
                formData,
                {
                    headers: {"Authorization" : `Bearer ${userToken}`}
                }
            )
        return newUserData
    }
    
}

export const newEpisode = async (data) => {
    const userToken = await getUserToken()
    if (userToken) {
        const formData = new FormData()
        const {episodeName, episodesContent} = data
        formData.append("episodeName", episodeName)
        formData.append("createdAt" , createdAt)
        episodesContent.forEach(content => {
            formData.append("episodesImage", content);
          });

        const response = await axios.post(`${Host.localhost}/episode`, 
            formData,
            {
                headers: {"Authorization" : `Bearer ${userToken}`}
            }
        )
        return response.data   
    }
    else {
        const msg = "Error getting token"
        return msg
    }
}

export const newWebtoon = async (data) => {
    const userToken = await getUserToken()
    if (userToken) {
        const formData = new FormData()
        const {webtoonTitle, episodes} = data
        formData.append("webtoonTitle", webtoonTitle)
        formData.append("episodes" , episodes)
        const response = await axios.post(`${Host.localhost}/webtoon`, 
            data,
            {
                headers: {"Authorization" : `Bearer ${userToken}`}
            }
        )
        return response.data   
    }
    else {
        const msg = "Error getting token"
        return msg
    }
}