import Axios from 'axios'
import Host from '../../environment/Host'

export const getAllWebtoon = () => {
    return {
        type: "GET_ALL_WEBTOON",
        payload: Axios.get(`${Host.localhost}/webtoons`)
    };
}

export const getLatestWebtoon = () => {
    return {
        type: "GET_LATEST_WEBTOON",
        payload: Axios.get(`${Host.localhost}/sortByDate`)
    };
}