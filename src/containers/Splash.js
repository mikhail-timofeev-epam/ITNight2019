import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";

class Splash extends Component {
    componentDidMount() {
        this.props.tryReOpenForLastUser();
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

export default connect(null, {
    ...actions,
})(Splash);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
