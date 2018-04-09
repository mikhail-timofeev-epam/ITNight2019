import VKLogin from 'react-native-vkontakte-login';

import {Alert} from "react-native";
import {ACTION_VK_SIGN_IN, SIGN_IN} from "../actions/SignInActionTypes";
import {AUTH_TYPES} from "../constants/index";

export default (store) => {
    return (next) => (action) => {
        console.log('middle');
        switch (action.type) {
            case ACTION_VK_SIGN_IN:
                VKLogin.login(['friends', 'photos', 'email']).then((vkAuthData) => {
                    console.log(vkAuthData);
                    fetch(
                        'http://ecsc00a017ee.epam.com:8090/user',
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: vkAuthData.email,
                                phone: '',
                                source: AUTH_TYPES.GOOGLE,
                                attrs: JSON.stringify({
                                    id_vk: vkAuthData.user_id
                                })
                            })
                        }
                    )
                        .then((epamAuthData) => { return epamAuthData.json(); })
                        .then((epamAuthData) => {
                            return next({
                                type: SIGN_IN,
                                payload: {
                                    name: '',
                                    email: vkAuthData.email,
                                    typeAuthorization: AUTH_TYPES.VK,
                                    phone: '',
                                    idVK: vkAuthData.user_id,
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
                        'Ошибка входа через VK',
                        'Произошла ошибка входа через VK. Попробуйте еще раз или воспользуйтесь другим методом входа',
                        [
                            {text: 'OK'}
                        ],
                        {cancelable: true}
                    );
                });
                break;
            default:
                next(action);
        }
    };
};