import Host from '../../environment/Host'
import Axios from 'axios'

export const getProfile = (userToken) => {
    return {
        type: "GET_PROFILE",
        payload: Axios.get(`${Host.localhost}/user`,{
            headers: {"Authorization" : `Bearer ${userToken}`}
        })
      };
}