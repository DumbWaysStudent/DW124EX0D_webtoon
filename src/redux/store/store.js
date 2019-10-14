import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import userReducer from '../reducer/userReducer'
import webtoonReducer from '../reducer/webtoonReducer'
const reducer = combineReducers({
    userReducer,
    webtoonReducer
})

const store = createStore(reducer , applyMiddleware(thunkMiddleware))

export default store



