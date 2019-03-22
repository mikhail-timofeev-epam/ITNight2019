import { ScoreboardActionTypes } from "./../actions/actionsTypes";

const initialState = {
  scoreboardData: [],
  scoreboardActivityIndicator: true,
  refreshing: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ScoreboardActionTypes.LOAD_SCOREBOARD_DATA_REQUEST:
            return {
                ...state,
                scoreboardActivityIndicator: true,
            };
        case ScoreboardActionTypes.LOAD_SCOREBOARD_DATA_SUCCESS:
            return {
                ...state,
                scoreboardData: action.payload,
                scoreboardActivityIndicator: false,
                refreshing: false
            };
        default:
            return state;
    }
}