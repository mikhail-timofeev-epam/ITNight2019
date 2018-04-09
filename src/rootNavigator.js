import * as React from "react";
import { StackNavigator } from "react-navigation";

import Main from "./containers/Main";
import LoginScreen from "./containers/LoginScreen";

import keymirror from "keymirror";

export const Routes = keymirror({
    Main: true,
});

const routeConfigMap = {
    [Routes.Login]: { path: "/login", screen: LoginScreen },
    [Routes.Main]: { path: "/main", screen: Main },
};

const stackConfig = {
    initialRouteName: Routes.Login,
    initialRouteParams: {},
};

export default StackNavigator(routeConfigMap, stackConfig);
