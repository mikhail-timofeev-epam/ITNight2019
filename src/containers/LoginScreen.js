import React, { Component } from "react";
import {
    Platform,
    AppRegistry,
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import validator from "validator";
import VKLogin from "react-native-vkontakte-login";
import { Routes } from "../rootNavigator";

import { googleSignIn } from "../actions/GoogleSignInAction";
import { vkSignIn } from "../actions/VKSignInAction";
import { simpleSignIn } from "../actions/SimpleSignInAction";

import actions from "../actions";

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            phone: "",
            isEmailValid: true,
            isPhoneValid: true,
            isLoginValid: true,
        };
    }

    componentDidMount() {
        VKLogin.initialize(6430395);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder="Ваша электронная почта"
                    keyboardType="email-address"
                />
                {this.state.isEmailValid ? null : (
                    <Text style={styles.alertLabel}>*Неверный формат электронной почты</Text>
                )}
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => this.setState({ phone: text })}
                    placeholder="Ваш номер телефона"
                    keyboardType="phone-pad"
                />
                {this.state.isPhoneValid ? null : (
                    <Text style={styles.alertLabel}>
                        *Неверный формат мобильного телефона. Телефон должен начинаться с +7 и
                        содержать только цифры
                    </Text>
                )}
                <TouchableOpacity style={styles.button} onPress={this.onLogin}>
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
                    onPress={this.onLoginViaVK}
                >
                    <Text style={styles.buttonLabel}>Войти через VK</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onLogin = () => {
        this.setState({ isEmailValid: validator.isEmail(this.state.email) });
        this.setState({ isPhoneValid: validator.isMobilePhone(this.state.phone, "ru-RU") });
        if (
            validator.isEmail(this.state.email) &&
            validator.isMobilePhone(this.state.phone, "ru-RU")
        ) {
            this.props.simpleSignIn({
                email: this.state.email,
                phone: this.state.phone,
            });
        }
    };

    onLoginViaGoogle = () => {
        this.props.googleSignIn();
    };

    onLoginViaVK = () => {
        this.props.vkSignIn();
    };
}

function mapStateToProps(state) {
    return {
        userId: state.authorization.userId,
        newUser: state.authorization.newUser,
    };
}

export default connect(mapStateToProps, {
    ...actions,
    googleSignIn,
    vkSignIn,
    simpleSignIn,
})(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },

    googleSignInButton: {
        backgroundColor: "#dd744c",
    },

    vkSignInButton: {
        backgroundColor: "#75a4dd",
    },

    button: {
        alignItems: "center",
        backgroundColor: "#a1a1a1",
        padding: 10,
        margin: 20,
        borderRadius: 10,
    },

    buttonLabel: {
        color: "white",
        fontWeight: "bold",
    },

    inputField: {
        height: 40,
        borderColor: "gray",
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    },

    separator: {
        alignSelf: "center",
        margin: 10,
    },

    alertLabel: {
        color: "red",
        margin: 10,
        fontSize: 11,
    },
});
