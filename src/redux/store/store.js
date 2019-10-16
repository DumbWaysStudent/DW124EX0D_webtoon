import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import allReducer from '../reducer/allReducer'
import userReducer from '../reducer/userReducer'
import webtoonReducer from '../reducer/webtoonReducer'
import favoriteReducer from '../reducer/favoriteReducer'
const reducer = combineReducers({
    userReducer,
    webtoonReducer,
    allReducer,
    favoriteReducer
})

const store = createStore(reducer , applyMiddleware(thunkMiddleware))

export default store



