const initialState = {
    allWebtoon : [],
    errorAll : false,
    isAllLoading : true,
    latestWebtoon : [],
    isLatestLoading : true,
    errorLatest : false
}

const allReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_ALL_WEBTOON" :
            return {
                ...state,
                allWebtoon : actions.payload,
                isAllLoading : true
            }
        case "GET_ALL_WEBTOON_FULFILLED" :
            return {
                ...state,
                allWebtoon : actions.payload.data,
                isAllLoading : false
            }
        case "GET_ALL_WEBTOON_REJECTED" :
            return {
                ...state,
                errorAll : true,
                isAllLoading : false
            }

        case "GET_LATEST_WEBTOON" : 
            return {
                ...state,
                latestWebtoon : actions.payload,
            }
        case "GET_LATEST_WEBTOON_FULFILLED" : 
            return {
                ...state,
                latestWebtoon : actions.payload.data,
                isLatestLoading : false
            }
        case "GET_LATEST_WEBTOON_REJECTED" :
            return {
                ...state,
                errorLatest : true,
                isLatestLoading : false
            }   
        default :
            return state
    }

}
export default allReducer
