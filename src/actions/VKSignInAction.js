import VKLogin from "react-native-vkontakte-login";

import apiAction from "./ApiActions";
import { Alert } from "react-native";
import { ACTION_VK_SIGN_IN, SIGN_IN } from "../actions/SignInActionTypes";
import { AUTH_TYPES } from "../constants/index";

export const vkSignIn = () => dispatch => {
    VKLogin.login(["email"])
        .then(vkAuthData => {
            const payload = {
                email: vkAuthData.email,
                phone: "",
                source: AUTH_TYPES.VK,
                attrs: {
                    id_vk: vkAuthData.user_id,
                },
            };
            const userMetaInfo = {
                name: "",
                email: vkAuthData.email,
                typeAuthorization: AUTH_TYPES.VK,
                phone: "",
                idVK: vkAuthData.user_id,
            };
            dispatch(apiAction.registerUser(payload, userMetaInfo));
        })
        .catch(error => {
            Alert.alert(
                "Ошибка авторизации",
                "Пожалуйста, повторите попытку позднее или воспользуйтесь другим методом авторизации",
                [{ text: "OK" }],
                { cancelable: true }
            );
        });
};
