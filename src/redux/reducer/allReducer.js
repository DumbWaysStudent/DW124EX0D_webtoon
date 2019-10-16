const initialState = {
    allWebtoon : [],
    error : false,
    isAllLoading : true,
    latestWebtoon : []
}

const allReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_ALL_WEBTOON" :
            return {
                ...state,
                allWebtoon : actions.payload.data,
                isAllLoading : false
            }
        case "GET_ALL_WEBTOON_ERROR" :
            return {
                ...state,
                error : true,
                isAllLoading : false
            }
        case "GET_LATEST_WEBTOON" : 
            return {
                ...state,
                latestWebtoon : actions.payload.data
            }
        case "GET_LATEST_WEBTOON_ERROR" :
            return {
                ...state,
                error : true,
                isAllLoading : false
            }   
        default :
            return state
    }

}
export default allReducer
