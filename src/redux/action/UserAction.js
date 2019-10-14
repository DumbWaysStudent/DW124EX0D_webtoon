import Host from '../../environment/Host'
import Axios from 'axios'

export const getProfile = (userToken) => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/user`, {
        headers: {"Authorization" : `Bearer ${userToken}`}
    })
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