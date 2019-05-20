import apiAction from "./ApiActions";

export const simpleSignIn = authData => dispatch => {
    const payload = {
        name: authData.name,
        phone: authData.phone,
    };
    dispatch(apiAction.registerUser(payload));
};
