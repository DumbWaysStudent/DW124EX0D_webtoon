import Axios from 'axios'
import Host from '../../environment/Host'

export const getUserWebtoon = (userToken, userId) => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/user/${userId}/webtoons`, {
        headers: {"Authorization" : `Bearer ${userToken}`}
    })
        if(result) {
        dispatch({
            type : "GET_USER_WEBTOON",
            payload : result
        })
        }
    }
    catch (error) {
        console.log(error)
        dispatch({
            type : "GET_WEBTOON_ERROR"
        })

    }
}

export const getUserWebtoonEpisode = (userToken, webtoonId) => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/webtoon/${webtoonId}/episodes`, {
        headers: {"Authorization" : `Bearer ${userToken}`}
    })
        if(result) {
        dispatch({
            type : "GET_WEBTOON_EPISODES",
            payload : result
        })
        }
    }
    catch (error) {
        console.log(error)
        dispatch({
            type : "GET_EPISODES_ERROR"
        })

    }
}