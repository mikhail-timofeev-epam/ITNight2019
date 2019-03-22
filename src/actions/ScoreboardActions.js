import { createAction } from "redux-actions";
import { ScoreboardActionTypes } from "./../actions/actionsTypes";

const scoreboardData = [
    {
        id: 1,
        name: "Вася",
        score: 1000,
    },
    {
        id: 2,
        name: "Маша",
        score: 1050,
    },
    {
        id: 3,
        name: "Саня",
        score: 200,
    },
    {
        id: 4,
        name: "Миша",
        score: 600,
    },
    {
        id: 5,
        name: "Коля",
        score: 800,
    },
    {
        id: 6,
        name: "Юля",
        score: 50,
    },
    {
        id: 7,
        name: "Коля",
        score: 1,
    },
    {
        id: 2,
        name: "Маша",
        score: 1050,
    },
    {
        id: 3,
        name: "Саня",
        score: 200,
    },
    {
        id: 4,
        name: "Миша",
        score: 600,
    },
    {
        id: 5,
        name: "Коля",
        score: 800,
    },
    {
        id: 6,
        name: "Юля",
        score: 50,
    },
    {
        id: 7,
        name: "Коля",
        score: 1,
    },
    {
        id: 2,
        name: "Маша",
        score: 1050,
    },
    {
        id: 3,
        name: "Саня",
        score: 200,
    },
    {
        id: 4,
        name: "Миша",
        score: 600,
    },
    {
        id: 5,
        name: "Коля",
        score: 800,
    },
    {
        id: 6,
        name: "Юля",
        score: 50,
    },
    {
        id: 7,
        name: "Коля",
        score: 1,
    },
];

const getScoreboardData = () => dispatch => {
    dispatch(createAction(ScoreboardActionTypes.LOAD_SCOREBOARD_DATA_REQUEST));
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(scoreboardData);
        }, 5000);
    })
        .then(result => dispatch(loadSuccues(result)))
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
