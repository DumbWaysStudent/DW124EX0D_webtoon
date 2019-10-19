const initialState = {
    data : [],
    isLoading : true,
    error : false
}

const favoriteReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_USERFAV":
            return {
                ...state,
                data : actions.payload,
                isLoading : true
            }
        case "GET_USERFAV_FULFILLED":
            return {
                ...state,
                data: actions.payload.data,
                isLoading: false
            };
        case "GET_USERFAV_REJECTED" : 
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