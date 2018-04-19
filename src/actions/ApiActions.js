import { createAction } from "redux-actions";
import { ApiActionTypes } from "./actionsTypes";
import { NavigationActions } from "react-navigation";
import navActions from "./NavigationActions"
import { Routes } from "../rootNavigator";
import { Alert } from "react-native";
import { SIGN_IN } from "./SignInActionTypes";

// See http://ecsc00a017ee.epam.com:8090/swagger-ui.html#/

export const ENDPOINT = "http://ec2-18-216-26-81.us-east-2.compute.amazonaws.com";
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
                        params: { userName: user.name, scores: user.score, userId: currentUserId },
                        key: mainRoute.key,
                    })
                );
            }
        });
};

const registerUser = (payload, metaInfo) => dispatch => {
    console.log("Register user: ", payload, metaInfo);
    const registerPayload = {
        ...payload,
        attrs: payload.attrs || {},
    };
    fetch(`${ENDPOINT}/user`, {
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
            console.log("Registration results: ", epamAuthData);
            dispatch({
                type: SIGN_IN,
                payload: {
                    ...metaInfo,
                    userId: epamAuthData.userId,
                    newUser: epamAuthData.newUser,
                },
            });
            return epamAuthData.userId;
        })
        .catch(error => {
            console.log(error);
            Alert.alert(
                "Ошибка авторизации",
                "Пожалуйста, попробуйте позднее.",
                [{ text: "OК" }],
                { cancelable: true }
            );
        })
        .then(userId => {
            console.log("Get user by id: ", userId);
            return fetch(`${ENDPOINT}/user/${userId}`, {
                method: "GET",
            });
        })
        .then(response => response.json())
        .then(response => {
            console.log("Receiverd user: ", response);
            if (!response.name) {
                dispatch(navActions.resetToSetUserName());
            } else {
                dispatch(navActions.navigateToMainAsRoot(response.name));
            }
        })
        .catch(error => {
            dispatch(createAction(ApiActionTypes.GET_USER_FAILURE)(error));
            Alert.alert(
                "Ошибка авторизации",
                "Невозможно загрузить профиль пользователя. Пожалуйста, попробуйте позднее.",
                [{ text: "OK" }],
                { cancelable: true }
            );
        });
};

const saveUserName = (id, name) => dispatch => {
    dispatch(createAction(ApiActionTypes.SAVE_USER_NAME_REQUEST));
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
