import * as React from "react";
import { StackNavigator } from "react-navigation";

import Main from "./containers/Main";

import keymirror from "keymirror";

export const Routes = keymirror({
    Main: true
});

const routeConfigMap = {
    [Routes.Main]: { path: "/main", screen: Main },
};

const stackConfig = {
    initialRouteName: Routes.Main,
    initialRouteParams: {},
};

export default StackNavigator(routeConfigMap, stackConfig);
