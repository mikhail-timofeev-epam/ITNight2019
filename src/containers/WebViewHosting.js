import React, { PureComponent } from "react";
import { WebView, View, ActivityIndicator, StyleSheet, BackHandler, Platform } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";

class WebViewHosting extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        if (Platform.OS === "android") {
            BackHandler.addEventListener("hardwareBackPress", this.handlerBackButton);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            BackHandler.removeEventListener("hardwareBackPress", this.handlerBackButton);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderActivityIndicator()}
                <WebView source={{ uri: this.props.uri }} onLoadEnd={this.handleWebViewLoaded} />
            </View>
        );
    }

    renderActivityIndicator() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" style={styles.activityIndicator} />;
        }
    }

    handleWebViewLoaded = () => {
        this.setState({ isLoading: false });
    };

    handlerBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };
}

function mapStateToProps(state, props) {
    return {
        uri: props.navigation.state.params.uri,
    };
}

export default connect(mapStateToProps, actions)(WebViewHosting);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    activityIndicator: {
        paddingTop: 16,
    },
});
