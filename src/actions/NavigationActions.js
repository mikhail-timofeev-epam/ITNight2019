import { NavigationActions } from "react-navigation";
import { Routes } from "../rootNavigator";
import { ENDPOINT } from "./ApiActions";

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

export default { openQuiz, openDashboard };
