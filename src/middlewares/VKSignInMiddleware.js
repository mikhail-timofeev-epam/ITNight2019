import VKLogin from 'react-native-vkontakte-login';

import {Alert} from "react-native";
import {ACTION_VK_SIGN_IN} from "../actions/VKSignInActionTypes";

export default (store) => {
    return (next) => (action) => {
        console.log('middle');
        switch (action.type) {
            case ACTION_VK_SIGN_IN:
                VKLogin.login(['friends', 'photos', 'email']).then((result) => {
                    return next({
                        type: ACTION_VK_SIGN_IN,
                        payload: {
                            userId: result.user_id,
                            email: result.email
                        }
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