import { ACTION_SIMPLE_SIGN_IN } from "./SignInActionTypes";
import { NavigationActions } from "react-navigation";
import apiAction from "./ApiActions";
import { AUTH_TYPES } from "../constants/index";

export const simpleSignIn = authData => dispatch => {
    const payload = {
        email: authData.email,
        phone: authData.phone,
        source: AUTH_TYPES.EMAIL,
    };
    const metaInfo = {
        name: "",
        email: authData.email,
        typeAuthorization: "",
        phone: authData.phone,
        idVK: "",
    };
    dispatch(apiAction.registerUser(payload, metaInfo));
};
