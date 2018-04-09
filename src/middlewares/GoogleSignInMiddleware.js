import GoogleSignIn from 'react-native-google-sign-in';

import {ACTION_GOOGLE_SIGN_IN, SIGN_IN} from '../actions/SignInActionTypes';
import {Alert} from "react-native";
import {AUTH_TYPES} from "../constants/index";

export default (store) => {
    return (next) => (action) => {
        switch (action.type) {
            case ACTION_GOOGLE_SIGN_IN:
                GoogleSignIn.configure({
                    // iOS
                    clientID: '474687684049-gje5siv602tc07ubks6rqvi54bcsq62q.apps.googleusercontent.com',

                    // iOS, Android
                    // https://developers.google.com/identity/protocols/googlescopes
                    scopes: ['profile', 'email'],

                    shouldFetchBasicProfile: true
                });

                GoogleSignIn.signInPromise().then((googleAuthData) => {
                    fetch(
                        'http://ecsc00a017ee.epam.com:8090/user',
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: googleAuthData.email,
                                phone: '',
                                source: AUTH_TYPES.GOOGLE
                            })
                        }
                    )
                        .then((epamAuthData) => { return epamAuthData.json(); })
                        .then((epamAuthData) => {
                            return next({
                                type: SIGN_IN,
                                payload: {
                                    name: googleAuthData.name,
                                    email: googleAuthData.email,
                                    typeAuthorization: '',
                                    phone: '',
                                    idVK: googleAuthData.user_id,
                                    userId: epamAuthData.userId,
                                    newUser: epamAuthData.newUser
                                }
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            Alert.alert(
                                'Ошибка входа',
                                'Произошла ошибка входа. Повторите позже.',
                                [
                                    {text: 'OK'}
                                ],
                                {cancelable: true}
                            )
                        });
                }).catch((error) => {
                    Alert.alert(
                        'Ошибка входа через Google',
                        'Произошла ошибка входа через Google. Попробуйте еще раз или воспользуйтесь другим методом входа',
                        [
                            {text: 'OK'}
                        ],
                        {cancelable: true}
                    )
                });
                break;
            default:
                next(action);
        }
    };
};