const initialState = {
    webtoonData : [],
    episodesData : [],
    isEpisodeLoading : true,
    isWebtoonLoading : true,
    errorWebtoon : false,
    errorEpisode : false
}

const webtoonReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_WEBTOON_EPISODES" :
            return {
                ...state,
                episodesData : actions.payload,
                isEpisodeLoading : true
            }
        case "GET_WEBTOON_EPISODES_FULFILLED" :
            return {
                ...state,
                episodesData: actions.payload.data,
                isEpisodeLoading: false
            };
        case "GET_WEBTOON_EPISODES_REJECTED" : 
            return {
                ...state,
                errorEpisode : true,
                isEpisodeLoading : false
            }  

        case "GET_USER_WEBTOON" :
            return {
                ...state,
                webtoonData : actions.payload,
                isWebtoonLoading : true
            }
        case "GET_USER_WEBTOON_FULFILLED" :
            return {
                ...state,
                webtoonData: actions.payload.data,
                isWebtoonLoading: false
            };
        case "GET_USER_WEBTOON_REJECTED" : 
            return {
                ...state,
                errorWebtoon : true,
                isWebtoonLoading : false
            }      
        default : 
            return state            
    }
}

export default webtoonReducer