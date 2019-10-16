import Axios from 'axios'
import Host from '../../environment/Host'

export const getUserFav = (userId, userToken) => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/user/${userId}/favorites`, 
    {
        headers: {"Authorization" : `Bearer ${userToken}`}}
    )
        if(result) {
        dispatch({
            type : "GET_USER_FAV",
            payload : result
        })
        }
    }
    catch (error) {
        console.log(error)
        dispatch({
            type : "GET_USER_FAV_ERROR"
        })

    }
}