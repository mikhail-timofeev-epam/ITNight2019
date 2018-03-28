import GoogleSignIn from 'react-native-google-sign-in';

import {ACTION_GOOGLE_SIGN_IN, ACTION_GOOGLE_SIGN_IN_ERROR} from '../actions/GoogleSignInActionTypes';
import {Alert} from "react-native";

export default (store) => {
    return (next) => (action) => {
        switch (action.type) {
            case ACTION_GOOGLE_SIGN_IN:
                GoogleSignIn.configure({
                    // iOS
                    clientID: '474687684049-gje5siv602tc07ubks6rqvi54bcsq62q.apps.googleusercontent.com',

                    // iOS, Android
                    // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
                    serverClientID: '474687684049-gje5siv602tc07ubks6rqvi54bcsq62q.apps.googleusercontent.com',

                    // iOS, Android
                    // https://developers.google.com/identity/protocols/googlescopes
                    scopes: ['profile', 'email']
                });

                GoogleSignIn.signInPromise().then((result) => {
                    return next({
                        type: ACTION_GOOGLE_SIGN_IN,
                        payload: {
                            name: result.name,
                            email: result.email
                        }
                    });
                }).catch((error) => {
                    console.log(error);
                    Alert.alert(
                        'Ошибка входа через Google',
                        'Произошла ошибка входа через Google. Попробуйте еще раз или воспользуйтесь другим методом входа',
                        [
                            {text: 'OK'}
                        ],
                        { cancelable: true }
                    )
                });
                break;
        }
    };
};