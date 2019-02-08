import * as React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationActions, StackNavigator, addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";
import _ from "lodash";

import Main from "./containers/Main";
import LoginScreen from "./containers/LoginScreen";
import SetUserName from "./containers/SetUserName";
import WebViewHosting from "./containers/WebViewHosting";
import Splash from "./containers/Splash";
import { RootNavListener } from "./middlewares/navigationMiddleware";
import actions from "./actions";

import keymirror from "keymirror";

export const Routes = keymirror({
    Splash: true,
    Main: true,
    Login: true,
    Tutorial: true,
    SetUserName: true,
    WebViewHosting: true,
});

const routeConfigMap = {
    [Routes.Login]: { path: "/login", screen: LoginScreen },
    [Routes.Splash]: { path: "/splash", screen: Splash },
    [Routes.Main]: {
        path: "/main",
        screen: Main,
        navigationOptions: ({ navigation }) => {
            const scores = Math.round(navigation.state.params.scores) || 0;

            const navigateToDashboard = _.debounce(() => {
                navigation.dispatch(actions.openDashboard());
            }, 500)

            return {
                title: `${navigation.state.params.userName || ""}`,
                headerTintColor: "white",
                headerRight: (
                    <TouchableOpacity
                        onPress={navigateToDashboard}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 18,
                                    alignSelf: "center",
                                    paddingRight: 8,
                                }}
                            >
                                {scores > 99999 ? "99999+" : scores}
                            </Text>
                            <Image
                                style={{ marginRight: 8 }}
                                source={require("./images/dashboard.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: "black",
                    borderBottomWidth: 0,
                    elevation: null,
                },
            };
        },
    },
    [Routes.SetUserName]: { path: "/setUserName", screen: SetUserName },
    [Routes.WebViewHosting]: { path: "/webViewHosting", screen: WebViewHosting },
};

const stackConfig = {
    initialRouteName: Routes.Main,
    initialRouteParams: {},
};

const RootNavigator = StackNavigator(routeConfigMap, stackConfig);

RootNavigator.router.getStateForAction = RootNavigator.router.getStateForAction

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
