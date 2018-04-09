import {ACTION_SIMPLE_SIGN_IN} from './SignInActionTypes';

export function simpleSignIn(authData) {
    return {
        type: ACTION_SIMPLE_SIGN_IN,
        payload: authData
    }
}