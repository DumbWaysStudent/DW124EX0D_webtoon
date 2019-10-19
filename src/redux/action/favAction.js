import Axios from 'axios'
import Host from '../../environment/Host'

export const getUserFav = (userId, userToken) => {
    return {
        type: "GET_USERFAV",
        payload: Axios.get(`${Host.localhost}/user/${userId}/favorites`, 
        {
            headers: {"Authorization" : `Bearer ${userToken}`}}
        )
      };
}