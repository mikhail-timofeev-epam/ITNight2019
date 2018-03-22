import React, {Component} from 'react';
import {AppRegistry, TextInput, StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => this.setState({text})}
                    placeholder='NickName'
                />
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => this.setState({text})}
                    placeholder='Email'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onLogin()}
                >
                    <Text style={styles.buttonLabel}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.googleSignInButton]}
                    onPress={this.onLoginViaGoogle()}
                >
                    <Text style={styles.buttonLabel}>Login via Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.vkSignInButton]}
                    onPress={this.onLoginViaVK()}>
                    <Text style={styles.buttonLabel}>Login via VK</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onLogin = () => {

    };

    onLoginViaGoogle = () => {

    };

    onLoginViaVK = () => {

    };
}

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
        margin: 10,
        padding: 5,
        borderBottomWidth: 1
    }
});