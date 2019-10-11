const initialState = {
    userData : [],
    error : false
}

const userReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_PROFILE" :
            return {
                ...state,
                userData : actions.payload.data,
            }
        case "GET_PROFILE_ERROR" : 
            return {
                ...state,
                error : true,
            }
        default : 
            return state            
    }
}

export default userReducer