const initialState = {
    episodesData : [],
    webtoonTitle : '',
    webtoonData : [],
    error : false
}

const webtoonReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "ADD_EPISODE" :
            const newData = actions.payload
            return {
                ...state,
                episodesData : [...state.episodesData,newData]
            }

        case "GET_USER_WEBTOON" :
            return {
                ...state,
                webtoonData : actions.payload.data,
            }
        case "GET_WEBTOON_ERROR" : 
            return {
                ...state,
                error : true,
            }      
        default : 
            return state            
    }
}

export default webtoonReducer