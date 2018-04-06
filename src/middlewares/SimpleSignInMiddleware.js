import {ACTION_SIMPLE_SIGN_IN, SIGN_IN} from "../actions/SignInActionTypes";
import {Alert} from "react-native";
import {AUTH_TYPES} from "../constants/index";

export default (store) => {
    return (next) => (action) => {
        switch (action.type) {
            case ACTION_SIMPLE_SIGN_IN:
                fetch(
                    'http://ecsc00a017ee.epam.com:8090/user',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: action.payload.email,
                            phone: '',
                            source: AUTH_TYPES.EMAIL
                        })
                    }
                )
                    .then((epamAuthData) => { return epamAuthData.json(); })
                    .then((epamAuthData) => {
                        return next({
                            type: SIGN_IN,
                            payload: {
                                name: '',
                                email: action.payload.email,
                                typeAuthorization: '',
                                phone: action.payload.phone,
                                idVK: '',
                                userId: epamAuthData.userId,
                                newUser: epamAuthData.newUser
                            }
                        });
                    })
                    .catch((error) => {
                        Alert.alert(
                            'Ошибка входа',
                            'Произошла ошибка входа. Повторите позже.',
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