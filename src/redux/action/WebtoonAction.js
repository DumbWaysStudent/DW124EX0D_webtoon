import Axios from 'axios'
import Host from '../../environment/Host'

export const getUserWebtoon = (userToken, userId) => {
    return {
        type: "GET_USER_WEBTOON",
        payload: Axios.get(`${Host.localhost}/user/${userId}/webtoons`, {
            headers: {"Authorization" : `Bearer ${userToken}`}
        })
    };
}

export const getUserWebtoonEpisode = (userToken, webtoonId) => {
    return {
        type: "GET_WEBTOON_EPISODES",
        payload: Axios.get(`${Host.localhost}/webtoon/${webtoonId}/episodes`, {
            headers: {"Authorization" : `Bearer ${userToken}`}
        })
    };
}