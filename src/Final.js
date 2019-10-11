import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import CheckNavigator from './navigator/CheckNavigator'
import {Provider} from 'react-redux'

YellowBox.ignoreWarnings([
    'Warning: componentWillMount has been',
    'Warning: Can'
    ]);
    
import store from './redux/store/store'

export default class Final extends Component {
    render() {
        return (
            <Provider store={store}>
                <CheckNavigator/>
            </Provider>
            
        );
    }
}