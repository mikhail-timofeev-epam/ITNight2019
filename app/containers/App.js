/**
 * Main app component.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import BeaconsMiddleware from '../middlewares/BeaconsMiddleware';

import beacons from '../reducers/BeaconsReducer';

const rootReducer = combineReducers({
  beacons,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, BeaconsMiddleware)
);

export default class App extends Component {

  render() {
    return (
      <View>
        <Text>Hello!</Text>
      </View>
    );
  }
}
