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

const navigateToMain = () => dispatch => {
    dispatch(
        NavigationActions.navigate({
            routeName: Routes.Main,
        })
    );
};

const resetToLogin = () => dispatch => {
    dispatch(createAction(ApiActionTypes.LOGOUT)());
    dispatch(NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: Routes.Login,
            })
        ]}
    ));
}

const tryReOpenForLastUser = () => (dispatch, getState) => {
    const currentUserId = getState().authorization.userId;
    console.log(">>>>", currentUserId)
    if (_.isNil(currentUserId)) {
        console.log(">>>> !!!!", currentUserId)
        dispatch(resetToLogin());
        return ;
    }
    console.log(">>>> WWWWW", currentUserId)
    return fetch(`${ENDPOINT}/user/${currentUserId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(user => {
                dispatch(
                    NavigationActions.navigate({
                        routeName: Routes.Main,
                        params: { userName: user.name, scores: user.score, userId: currentUserId },
                    })
                );
        })
        .catch(()=>{
            dispatch(resetToLogin());
        });
};

export default { openQuiz, openDashboard, navigateToMain, tryReOpenForLastUser };
