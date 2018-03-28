import {ACTION_GOOGLE_SIGN_IN} from "../actions/GoogleSignInActionTypes";

const initialState = {
    email: '',
    name: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_GOOGLE_SIGN_IN:
            console.log(action);
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name
            };
        default:
            return state;
    }
}