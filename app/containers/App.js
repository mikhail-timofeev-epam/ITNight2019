/**
 * Main app component.
 */

import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {StackNavigator} from "react-navigation";

import BeaconsMiddleware from '../middlewares/BeaconsMiddleware';
import beacons from '../reducers/BeaconsReducer';
import LoginScreen from '../containers/LoginScreen';

const rootReducer = combineReducers({
    beacons,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, BeaconsMiddleware)
);

export const AppNavigator = StackNavigator({
    Home: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'CatchTheAsteroid'
        }
    }
});

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}
