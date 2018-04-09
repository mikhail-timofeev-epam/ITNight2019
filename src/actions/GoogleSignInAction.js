import GoogleSignIn from "react-native-google-sign-in";

import { registerUser } from "./ApiActions";
import { ACTION_GOOGLE_SIGN_IN, SIGN_IN } from "../actions/SignInActionTypes";
import { Alert } from "react-native";
import { AUTH_TYPES } from "../constants/index";

export const googleSignIn = () => dispatch => {
    GoogleSignIn.configure({
        // iOS
        clientID: "474687684049-gje5siv602tc07ubks6rqvi54bcsq62q.apps.googleusercontent.com",

        // iOS, Android
        // https://developers.google.com/identity/protocols/googlescopes
        scopes: ["profile", "email"],

        shouldFetchBasicProfile: true,
    });

    GoogleSignIn.signInPromise()
        .then(googleAuthData => {
            const payload = {
                email: googleAuthData.email,
                phone: "",
                source: AUTH_TYPES.GOOGLE,
            };
            const userMetaInfo = {
                name: googleAuthData.name,
                email: googleAuthData.email,
                typeAuthorization: "",
                phone: "",
                idVK: googleAuthData.user_id,
            };
            dispatch(registerUser(payload, userMetaInfo));
        })
        .catch(error => {
            Alert.alert(
                "Ошибка входа через Google",
                "Произошла ошибка входа через Google. Попробуйте еще раз или воспользуйтесь другим методом входа",
                [{ text: "OK" }],
                { cancelable: true }
            );
        });
};
