import { MainActionTypes } from "../actions/MainActions";

const initialState = {
    isFirstRun: true,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case MainActionTypes.HIDE_TUTORIAL:
            return {
                ...state,
                isFirstRun: false,
            };
        default:
            return state;
    }
}
