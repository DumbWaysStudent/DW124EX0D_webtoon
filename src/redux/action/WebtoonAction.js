export const addEpisode = (episode) => (dispatch)  => {
    dispatch({
        type : "ADD_EPISODE",
        payload : episode
    })
}

export const getUserWebtoon = (userToken, userId) => async(dispatch) => {
    try {
    const result = await Axios.get(`${Host.localhost}/webtoons/${userId}`, {
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