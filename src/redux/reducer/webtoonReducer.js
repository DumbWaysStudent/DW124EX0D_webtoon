const initialState = {
    webtoonData : [],
    episodesData : [],
    isLoading : true,
    errorWebtoon : false,
    errorEpisode : false
}

const webtoonReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_WEBTOON_EPISODES" :
            return {
                ...state,
                episodesData : actions.payload.data
            }
        case "GET_EPISODES_ERROR" : 
            return {
                ...state,
                errorEpisode : true,
            }  
        case "GET_USER_WEBTOON" :
            return {
                ...state,
                webtoonData : actions.payload.data,
                isLoading : false
            }
        case "GET_WEBTOON_ERROR" : 
            return {
                ...state,
                errorWebtoon : true,
                isLoading : false
            }      
        default : 
            return state            
    }
}

export default webtoonReducer