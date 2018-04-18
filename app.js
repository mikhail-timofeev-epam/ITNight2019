import React, {Component} from 'react';
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/createStore";
import { RootNavigatorContainer } from "./src/rootNavigator";
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootNavigatorContainer />
                </PersistGate>
            </Provider>
        );
    }
}