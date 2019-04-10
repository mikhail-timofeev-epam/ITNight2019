import React, { Component } from "react";
import {
    Platform,
    AppRegistry,
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    CheckBox,
    Switch,
    ScrollView,
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
            isNameValid: true,
            isPhoneValid: true,
            isLoginValid: true,
            isAgreed: false,
            name: "",
            nameError: null,
        };
    }

    componentDidMount() {
        VKLogin.initialize(6430395);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/* <TextInput
                        style={styles.inputField}
                        onChangeText={text => this.setState({ email: text })}
                        placeholder="Ваша электронная почта"
                        keyboardType="email-address"
                    />
                    {this.state.isEmailValid ? null : (
                        <Text style={styles.alertLabel}>*Неверный формат электронной почты</Text>
                    )} */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* <Text>#{this.props.userId}/</Text> */}
                        <TextInput
                            style={styles.inputField}
                            onChangeText={text => this.setState({ name: text })}
                            placeholder="Ваше имя для таблицы лидеров"
                        />
                    </View>
                    {this.state.isNameValid ? null : (
                        <Text style={styles.alertLabel}>*Имя должно быть не пустым</Text>
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
                    {this.renderAgreement()}
                    <TouchableOpacity
                        style={[styles.button, this.getDisabledStyle()]}
                        onPress={this.handlePressLogin}
                        disabled={!this.state.isAgreed}
                    >
                        <Text style={styles.buttonLabel}>Войти</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.separator}>------------ или ------------</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.googleSignInButton, this.getDisabledStyle()]}
                        onPress={this.handlePressLoginViaGoogle}
                        disabled={!this.state.isAgreed}
                    >
                        <Text style={styles.buttonLabel}>Войти через Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.vkSignInButton, this.getDisabledStyle()]}
                        onPress={this.handlePressLoginViaVK}
                        disabled={!this.state.isAgreed}
                    >
                        <Text style={styles.buttonLabel}>Войти через VK</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        );
    }

    renderAgreement = () => {
        const checkBoxRender = Platform.select({
            android: () => (
                <CheckBox
                    value={this.state.isAgreed}
                    onValueChange={() => this.setState({ isAgreed: !this.state.isAgreed })}
                />
            ),
            ios: () => (
                <Switch
                    value={this.state.isAgreed}
                    onValueChange={() => this.setState({ isAgreed: !this.state.isAgreed })}
                />
            ),
        });

        return (
            <View style={{ flexDirection: "row", margin: 16 }}>
                <Text style={{ flex: 2 }}>Даю согласие на обработку своих персональных данных</Text>
                {checkBoxRender()}
            </View>
        );
    };

    // onLogin = () => {
    //     this.setState(
    //         { nameError: !this.state.name.trim() ? "Имя должно быть не пустым" : null },
    //         () => {
    //             if (!this.state.nameError) {
    //                 this.props.saveUserName(this.props.userId, this.state.name);
    //             }
    //         }
    //     );
    // };

    handlePressLogin = () => {
        // this.setState({ isEmailValid: validator.isEmail(this.state.email) });
        this.setState({ isNameValid: !validator.isEmpty(this.state.name) });
        this.setState({ isPhoneValid: validator.isMobilePhone(this.state.phone, "ru-RU") });
        if (
            // validator.isEmail(this.state.email) &&
            !validator.isEmpty(this.state.name) &&
            validator.isMobilePhone(this.state.phone, "ru-RU")
        ) {
            this.props.simpleSignIn({
                name: this.state.name,
                phone: this.state.phone,
            });
            this.props.saveUserName(this.state.name);
        }
    };

    handlePressLoginViaGoogle = () => {
        this.props.googleSignIn();
    };

    handlePressLoginViaVK = () => {
        this.props.vkSignIn();
    };

    getDisabledStyle = () => (this.state.isAgreed ? null : styles.buttonDisabled);
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
        paddingTop: 30
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
        margin: 10,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: "gray",
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
    inputField: {
        flex: 1,
        height: 40,
        borderColor: "gray",
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    },
});
