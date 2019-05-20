import { createAction } from "redux-actions";
import { ApiActionTypes } from "./actionsTypes";
import { NavigationActions } from "react-navigation";
import navActions from "./NavigationActions";
import { Routes } from "../rootNavigator";
import { Alert } from "react-native";
import { SIGN_IN } from "./SignInActionTypes";

// See http://ecsc00a017ee.epam.com:8090/swagger-ui.html#/

export const ENDPOINT = "https://us-central1-scorching-heat-4242.cloudfunctions.net";
const ALL_STATIONS = ENDPOINT + "/station";

const getAllStations = () => dispatch => {
    dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_REQUEST));
    return fetch(ALL_STATIONS)
        .then(response => response.json())
        .then(response => dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_SUCCESS)(response)))
        .catch(error => dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_FAILURE)(error)));
};

const getUserById = id => dispatch => {
    dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_REQUEST));
    return fetch(`${ENDPOINT}/user/${id}`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(response => dispatch(createAction(ApiActionTypes.GET_USER_SUCCESS)(response)))
        .catch(error => dispatch(createAction(ApiActionTypes.GET_USER_FAILURE)(error)));
};

const updateMainScreenHeader = () => (dispatch, getState) => {
    const currentUserId = getState().authorization.userId;
    return fetch(`${ENDPOINT}/user/${currentUserId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(user => {
            const mainRoute = getState().rootNavigation.root.routes.find(
                route => route.routeName === Routes.Main
            );
            if (mainRoute) {
                dispatch(
                    NavigationActions.setParams({
                        params: { userName: user.name, score: user.score, userId: currentUserId },
                        key: mainRoute.key,
                    })
                );
            }
        });
};

const registerUser = (payload) => dispatch => {
    const registerPayload = {
        ...payload,
        attrs: payload.attrs || {},
    };

    fetch(`${ENDPOINT}/user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerPayload),
    })
        .then(epamAuthData => {
            return epamAuthData.json();
        })
        .then(epamAuthData => {
            dispatch({
                type: SIGN_IN,
                payload: {
                    ...registerPayload,
                    userId: epamAuthData.userid,
                },
            });
            dispatch(navActions.navigateToMainAsRoot(registerPayload.name));
        })
        .catch(error => {
            Alert.alert("Ошибка авторизации", "Пожалуйста, попробуйте позднее.", [{ text: "OК" }], {
                cancelable: true,
            });
        })
};

const saveUserName = (name) => dispatch => {
    dispatch(createAction(ApiActionTypes.SAVE_USER_NAME_REQUEST));

    dispatch(navActions.navigateToMainAsRoot(name));
    return;
    // TODO: Mock calls
    return fetch(`${ENDPOINT}/user/${id}?name=${id}/${name}`, {
        method: "PUT",
    })
        .then(response => response.json())
        .then(response => {
            dispatch(createAction(ApiActionTypes.SAVE_USER_NAME_SUCCESS)(response));
            dispatch(navActions.navigateToMainAsRoot(name));
        })
        .catch(error => dispatch(createAction(ApiActionTypes.SAVE_USER_NAME_FAILURE)(error)));
};

export default { getAllStations, saveUserName, registerUser, updateMainScreenHeader };
