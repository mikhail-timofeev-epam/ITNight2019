import { NavigationActions } from "react-navigation";
import { createAction } from "redux-actions";
import { Routes } from "../rootNavigator";
import { ENDPOINT } from "./ApiActions";
import _ from "lodash";
import { ApiActionTypes } from "./actionsTypes";

const openQuiz = quizId => dispatch => {
    dispatch(
        NavigationActions.navigate({
            routeName: Routes.WebViewHosting,
            params: { uri: `${ENDPOINT}/quiz/${quizId}` },
        })
    );
};

const openDashboard = quizId => dispatch => {
    dispatch(
        NavigationActions.navigate({
            routeName: Routes.WebViewHosting,
            params: { uri: `${ENDPOINT}/dashboard` },
        })
    );
};

const openScoreboard = quizId => dispatch => {
    dispatch(
        NavigationActions.navigate({
            routeName: Routes.Scoreboard,
            params: { uri: `${ENDPOINT}/scoreboard` },
        })
    );
};

const navigateToMain = () => dispatch => {
    dispatch(
        NavigationActions.navigate({
            routeName: Routes.Main,
        })
    );
};

const navigateToMainAsRoot = userName => dispatch => {
    dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: Routes.Main,
                    params: {
                        userName,
                    },
                }),
            ],
        })
    );
};

const resetToLogin = () => dispatch => {
    dispatch(createAction(ApiActionTypes.LOGOUT)());
    dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: Routes.Login,
                }),
            ],
        })
    );
};

const resetToSetUserName = () => dispatch => {
    dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: Routes.SetUserName,
                }),
            ],
        })
    );
};

const tryReOpenForLastUser = () => (dispatch, getState) => {
    const currentUserId = getState().authorization.userId;

    if (_.isNil(currentUserId)) {
        dispatch(resetToLogin());
        return;
    } else {
        return fetch(`${ENDPOINT}/user/${currentUserId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(user => {
                dispatch(navigateToMainAsRoot());
            })
            .catch(() => {
                dispatch(resetToLogin());
            });
    }
};

export default {
    openQuiz,
    openDashboard,
    openScoreboard,
    navigateToMain,
    tryReOpenForLastUser,
    navigateToMainAsRoot,
    resetToSetUserName,
};
