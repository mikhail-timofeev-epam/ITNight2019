import React, {Component} from 'react';
import { Provider } from "react-redux";
import { store } from "./src/store/createStore";
import RootNavigatorContainer from "./src/rootNavigator";

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <RootNavigatorContainer />
            </Provider>
        );
    }
}