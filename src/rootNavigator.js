import * as React from "react";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";

import Main from "./containers/Main";
import LoginScreen from "./containers/LoginScreen";
import SetUserName from "./containers/SetUserName";
import WebViewHosting from "./containers/WebViewHosting";
import { RootNavListener } from "./middlewares/navigationMiddleware";

import keymirror from "keymirror";

export const Routes = keymirror({
    Main: true,
    Login: true,
    SetUserName: true,
    WebViewHosting: true,
});

const routeConfigMap = {
    [Routes.Login]: { path: "/login", screen: LoginScreen },
    [Routes.Main]: {
        path: "/main",
        screen: Main,
        navigationOptions: ({ navigation }) => {
            return {
                title: `${navigation.state.params.userName || ""}`,
            };
        },
    },
    [Routes.SetUserName]: { path: "/setUserName", screen: SetUserName },
    [Routes.WebViewHosting]: { path: "/webViewHosting", screen: WebViewHosting },
};

const stackConfig = {
    initialRouteName: Routes.Login,
    initialRouteParams: {},
};

const RootNavigator = StackNavigator(routeConfigMap, stackConfig);

class RootNavigatorComponent extends React.PureComponent {
    render() {
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navState,
            addListener: RootNavListener,
        });

        return <RootNavigator navigation={navigation} />;
    }
}

function mapStateToProps(state) {
    return {
        navState: state.rootNavigation.root,
    };
}

const RootNavigatorContainer = connect(mapStateToProps)(RootNavigatorComponent);

export { RootNavigatorContainer, RootNavigator };
