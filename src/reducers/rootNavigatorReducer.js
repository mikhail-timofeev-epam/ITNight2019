import { NavigationActions } from "react-navigation";
import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { RootNavigator } from "../rootNavigator";

const getStateForActionRoot = RootNavigator.router.getStateForAction;

function handleNavAction(state, action) {
    return {
        ...state,
        root: getStateForActionRoot(action, state.root),
    };
}

const initialState = {
    root: getStateForActionRoot(NavigationActions.init({})),
};

export default handleActions(
    {
        [NavigationActions.BACK]: handleNavAction,
        [NavigationActions.INIT]: handleNavAction,
        [NavigationActions.NAVIGATE]: handleNavAction,
        [NavigationActions.RESET]: handleNavAction,
        [NavigationActions.SET_PARAMS]: handleNavAction,
        [NavigationActions.URI]: handleNavAction,
    },
    initialState
);
