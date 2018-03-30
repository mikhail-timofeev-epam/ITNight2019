import {ACTION_VK_SIGN_IN} from './VKSignInActionTypes';

export function vkSignIn() {
    console.log('action');
    return {
        type: ACTION_VK_SIGN_IN,
        payload: {}
    }
}