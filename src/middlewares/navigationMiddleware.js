import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener,
} from "react-navigation-redux-helpers";

const rootNavKey = "root";
const RootNavMiddleware = createReactNavigationReduxMiddleware(
    rootNavKey,
    state => state.rootNavigation.root
);
const RootNavListener = createReduxBoundAddListener(rootNavKey);

export { RootNavMiddleware, RootNavListener };
