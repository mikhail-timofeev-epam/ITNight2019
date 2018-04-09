import {SIGN_IN} from "../actions/SignInActionTypes";

const initialState = {
    email: '',
    name: '',
    typeAuthorization: '',
    phone: '',
    idVK: '',
    newUser: true,
    userId: 0
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                typeAuthorization: action.payload.typeAuthorization,
                phone: action.payload.phone,
                idVK: action.payload.idVK,
                newUser: action.payload.newUser,
                userId: action.payload.userId
            };
        default:
            return state;
    }
}