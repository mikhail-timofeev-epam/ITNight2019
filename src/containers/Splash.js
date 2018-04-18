import React, { Component } from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet
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

class Splash extends Component {
    componentDidMount() {
        this.props.tryReOpenForLastUser();
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.authorization.userId,
    };
}

export default connect(mapStateToProps, {
    ...actions
})(Splash);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
