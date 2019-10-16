const initialState = {
    favoritData : [],
    isLoading : true,
    error : false
}

const favoriteReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_USER_FAV":
            return {
                ...state,
                favoritData : actions.payload.data,
                isLoading : false
            }
        case "GET_USER_FAV_ERROR" : 
            return {
                ...state,
                isLoading : false,
                error : true
            }
        default : 
            return state
    }
}

export default favoriteReducer