import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import userReducer from '../reducer/UserReducer'

const reducer = combineReducers({
    userReducer
})

const store = createStore(reducer , applyMiddleware(thunkMiddleware))

export default store



