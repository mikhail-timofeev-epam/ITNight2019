import GoogleSignIn from 'react-native-google-sign-in';

import {ACTION_GOOGLE_SIGN_IN} from '../actions/GoogleSignInActionTypes';

export default (store) => {
    return (next) => (action) => {
        switch (action.type) {
            case ACTION_GOOGLE_SIGN_IN:
                GoogleSignIn.configure({
                    // iOS
                    clientID: '474687684049-gje5siv602tc07ubks6rqvi54bcsq62q.apps.googleusercontent.com',

                    // iOS, Android
                    // https://developers.google.com/identity/protocols/googlescopes
                    scopes: ['profile', 'email']
                });

                GoogleSignIn.signInPromise().then((result)=>{
                    console.log(result);
                }).catch((error)=>{
                    console.log(error)
                });
                break;
        }
    };
};