import {ACTION_VK_SIGN_IN} from "../actions/VKSignInActionTypes";

const initialState = {
    email: '',
    userId: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_VK_SIGN_IN:
            return {
                ...state,
                email: action.payload.email,
                userId: action.payload.userId
            };
        default:
            return state;
    }
}