const initialState = {
    allWebtoon : [],
    error : false,
    isLoading : true
}

const allReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_ALL_WEBTOON" :
            return {
                ...state,
                allWebtoon : actions.payload.data,
                isLoading : false
            }
        case "GET_ALL_WEBTOON_ERROR" :
            return {
                ...state,
                error : true
            }
        default :
            return state
    }

}
export default allReducer
