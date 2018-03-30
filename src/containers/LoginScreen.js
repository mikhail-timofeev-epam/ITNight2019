import React, {Component} from 'react';
import {Platform, AppRegistry, TextInput, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import validator from 'validator';
import VKLogin from 'react-native-vkontakte-login';

import {googleSignIn} from "../actions/GoogleSignInAction";
import {vkSignIn} from "../actions/VKSignInAction";

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            email: '',
            phone: '',
            isEmailValid: true,
            isPhoneValid: true,
            isLoginValid: true
        };
    }

    componentDidMount() {
        //TODO change id if you use this app on your pc
        VKLogin.initialize(6430395);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => this.setState({login: text})}
                    placeholder='Ваш логин'
                />
                {
                    this.state.isLoginValid
                        ?
                        null
                        :
                        (<Text style={styles.alertLabel}>
                            *Логин должен содержать только буквы и цифры
                        </Text>)
                }
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder='Ваша электронная почта'
                />
                {
                    this.state.isEmailValid
                        ?
                        null
                        :
                        (<Text style={styles.alertLabel}>
                            *Неверный формат электронной почты
                        </Text>)
                }
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => this.setState({phone: text})}
                    placeholder='Ваш номер телефона'
                />
                {
                    this.state.isPhoneValid
                        ?
                        null
                        :
                        (<Text style={styles.alertLabel}>
                            *Неверный формат мобильного телефона. Телефон должен начинаться с +7 и содержать только цифры
                        </Text>)
                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onLogin}
                >
                    <Text style={styles.buttonLabel}>Войти</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>------------ или ------------</Text>
                <TouchableOpacity
                    style={[styles.button, styles.googleSignInButton]}
                    onPress={this.onLoginViaGoogle}
                >
                    <Text style={styles.buttonLabel}>Войти через Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.vkSignInButton]}
                    onPress={this.onLoginViaVK}>
                    <Text style={styles.buttonLabel}>Войти через VK</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onLogin = () => {
        this.setState({isEmailValid: validator.isEmail(this.state.email)});
        this.setState({isPhoneValid: validator.isMobilePhone(this.state.phone, 'ru-RU')});
        this.setState({isLoginValid: validator.isAlphanumeric(this.state.login)});
    };

    onLoginViaGoogle = () => {
        this.props.googleSignIn();
    };

    onLoginViaVK = () => {
        this.props.vkSignIn();
    };
}

function mapDispatchToProps(dispatch) {
    return {
        googleSignIn: bindActionCreators(googleSignIn, dispatch),
        vkSignIn: bindActionCreators(vkSignIn, dispatch)
    }
}

function mapStateToProps() {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    googleSignInButton: {
        backgroundColor: '#dd744c'
    },

    vkSignInButton: {
        backgroundColor: '#75a4dd'
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#a1a1a1',
        padding: 10,
        margin: 20,
        borderRadius: 10
    },

    buttonLabel: {
        color: 'white',
        fontWeight: 'bold'
    },

    inputField: {
        height: 40,
        borderColor: 'gray',
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },

    separator: {
        alignSelf: 'center',
        margin: 10
    },

    alertLabel: {
        color: 'red',
        margin: 10,
        fontSize: 11
    }
});