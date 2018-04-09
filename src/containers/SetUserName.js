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
import { bindActionCreators } from "redux";
import actions from "../actions";
import validator from "validator";
import VKLogin from "react-native-vkontakte-login";

import { googleSignIn } from "../actions/GoogleSignInAction";
import { vkSignIn } from "../actions/VKSignInAction";
import { simpleSignIn } from "../actions/SimpleSignInAction";
import { Routes } from "../rootNavigator";

class SetUserName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            nameError: null,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => this.setState({ name: text })}
                    placeholder="Ваше имя для таблицы лидеров"
                />
                {this.state.nameError === null ? null : (
                    <Text style={styles.alertLabel}>
                        *Ошибка при сохранении имени, попробуйте еще раз
                    </Text>
                )}
                <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                    <Text style={styles.buttonLabel}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onLogin = () => {
        this.setState(
            { nameError: !this.state.name.trim() ? "Имя должно быть не пустым" : null },
            () => {
                if (!this.state.nameError) {
                    console.log(">>>>>>>", this.props);
                    this.props.saveUserName(this.props.userId, this.state.name);
                }
            }
        );
    };
}

function mapStateToProps(state) {
    return {
        userId: state.authorization.userId,
        name: state.authorization.name,
    };
}

export default connect(mapStateToProps, actions)(SetUserName);

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
