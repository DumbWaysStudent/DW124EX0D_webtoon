import Host from '../../environment/Host'
import Axios from 'axios'

export const getProfile = (userId) => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/users/${userId}`)
        if(result) {
        dispatch({
            type : "GET_PROFILE",
            payload : result
        })
        }
    }
    catch (error) {
        console.log(error)
        dispatch({
            type : "GET_PROFILE_ERROR"
        })

    }
}