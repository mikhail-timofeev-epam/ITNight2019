import { createAction } from "redux-actions";
import { ScoreboardActionTypes } from "./../actions/actionsTypes";

const ENDPOINT = "https://us-central1-scorching-heat-4242.cloudfunctions.net";

const getScoreboardData = () => dispatch => {
    dispatch(createAction(ScoreboardActionTypes.LOAD_SCOREBOARD_DATA_REQUEST));

    return fetch(`${ENDPOINT}/scoreboard`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(result => {
            dispatch(loadSuccues(result))
        })
        .catch(error => dispatch(loadFailure(error)));
};

const loadSuccues = data => {
    return {
        type: ScoreboardActionTypes.LOAD_SCOREBOARD_DATA_SUCCESS,
        payload: data,
    };
};

const loadFailure = () => {
    return {
        type: ScoreboardActionTypes.LOAD_SCOREBOARD_DATA_FAILURE,
    };
};

export default { getScoreboardData };
