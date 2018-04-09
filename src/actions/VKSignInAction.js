import VKLogin from "react-native-vkontakte-login";

import { Alert } from "react-native";
import { ACTION_VK_SIGN_IN, SIGN_IN } from "../actions/SignInActionTypes";
import { AUTH_TYPES } from "../constants/index";

export const vkSignIn = () => dispatch => {
    VKLogin.login(["friends", "photos", "email"])
        .then(vkAuthData => {
            const payload = {
                email: vkAuthData.email,
                phone: "",
                source: AUTH_TYPES.GOOGLE,
                attrs: JSON.stringify({
                    id_vk: vkAuthData.user_id,
                }),
            };
            const userMetaInfo = {
                name: "",
                email: vkAuthData.email,
                typeAuthorization: AUTH_TYPES.VK,
                phone: "",
                idVK: vkAuthData.user_id,
                userId: epamAuthData.userId,
                newUser: epamAuthData.newUser,
            };
            dispatch(registerUser(payload, userMetaInfo));
        })
        .catch(error => {
            Alert.alert(
                "Ошибка входа через VK",
                "Произошла ошибка входа через VK. Попробуйте еще раз или воспользуйтесь другим методом входа",
                [{ text: "OK" }],
                { cancelable: true }
            );
        });
};
