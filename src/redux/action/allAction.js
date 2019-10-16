import Axios from 'axios'
import Host from '../../environment/Host'

export const getAllWebtoon = () => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/webtoons`)
        if(result) {
        dispatch({
            type : "GET_ALL_WEBTOON",
            payload : result
        })
        }
    }
    catch (error) {
        console.log(error)
        dispatch({
            type : "GET_ALL_WEBTOON_ERROR"
        })

    }
}