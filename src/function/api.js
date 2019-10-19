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
    console.log(userIdJSON)
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
    const userId = await getUserId()
    if (userToken) {
        const formData = new FormData()
        const {title, contentImage, webtoonId} = data
        formData.append("title", title)
        contentImage.forEach(content => {
            formData.append("contentImage", {uri: content,
            type: "image/jpeg",
            name: `${Date.now()}.jpeg`});
          });

        const response = await axios.post(`${Host.localhost}/user/${userId}/webtoon/${webtoonId}/episode`, 
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
    const userId = await getUserId()
    if (userToken) {
        const formData = new FormData()
        const {title, coverImage, genre} = data
        formData.append("title", title)
        formData.append("coverImage" , coverImage)
        formData.append("genre", genre)
        const response = await axios.post(`${Host.localhost}/user/${userId}/webtoon`, 
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

export const editWebtoon = async(formData, webtoonId) => {
    const userToken = await getUserToken()
    const userId = await getUserId()
    if(userToken) {
        const newWebtoon = await axios.put(`${Host.localhost}/user/${userId}/webtoon/${webtoonId}`, 
                formData,
                {
                    headers: {"Authorization" : `Bearer ${userToken}`}
                }
            )
        return newWebtoon
    }
    
}
export const deleteWebtoon = async (webtoonId) => {
    const userToken = await getUserToken()
    const userId = await getUserId()
    if (userToken) {
        await axios.delete(`${Host.localhost}/user/${userId}/webtoon/${webtoonId}`, 
            {
                headers: {"Authorization" : `Bearer ${userToken}`}
            }
        )
    }
    else {
        const msg = "Error getting token"
        return msg
    }
}
export const getEpisode = async (webtoonId) => {
    const result = await axios.get(`${Host.localhost}/webtoon/${webtoonId}/episodes`)
    return result.data
}


export const getEpisodeImage = async ( episodeId, webtoonId) => {
    try{
            const imageData = await axios.get(`${Host.localhost}/webtoon/${webtoonId}/episode/${episodeId}/images`)
            return imageData.data
    }
    catch(err) {
        console.log(err)
        const msg = "Error getting data"
        return msg
    }
    
}
export const deleteEpisode = async (episodeId, webtoonId) => {
    const userToken = await getUserToken()
    const userId = await getUserId()
    if (userToken) {
        await axios.delete(`${Host.localhost}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}`, 
            {
                headers: {"Authorization" : `Bearer ${userToken}`}
            }
        )
    }
    else {
        const msg = "Error getting token"
        return msg
    }
}

export const editEpisodeWebtoon = async(formData, episodeId, webtoonId) => {
    const userToken = await getUserToken()
    const userId = await getUserId()
    if(userToken) {
        const editEpisode = await axios.put(`${Host.localhost}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}`, 
                formData,
                {
                    headers: {"Authorization" : `Bearer ${userToken}`}
                }
            )
        return editEpisode
    }
    else {
        return "Error editing data"
    }
    
}


export const deleteEpisodeImage = async (imageId, episodeId, webtoonId) => {
    const userToken = await getUserToken()
    const userId = await getUserId()
    if (userToken) {
        await axios.delete(`${Host.localhost}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}/image/${imageId}`, 
            {
                headers: {"Authorization" : `Bearer ${userToken}`}
            }
        )
    }
    else {
        const msg = "Error getting token"
        return msg
    }
}