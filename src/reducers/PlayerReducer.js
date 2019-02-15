import { PlayerActionTypes } from "../actions/actionsTypes";

const initialState = {
    basket: [],
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case PlayerActionTypes.ON_ADD_TO_BASKET:
            return {
                ...state,
                basket: basket.concat([action.payload]),
            };
        case PlayerActionTypes.ON_CLEAR_BASKET:
            return {
                ...state,
                basket: [],
            };
        default:
            return state;
    }
}
