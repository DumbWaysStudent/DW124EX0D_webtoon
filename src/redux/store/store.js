import { createStore, combineReducers, applyMiddleware} from 'redux'

import promise from 'redux-promise-middleware'


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

const store = createStore(reducer , applyMiddleware(promise))

export default store



