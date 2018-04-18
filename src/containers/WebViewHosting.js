import React, { PureComponent } from "react";
import { WebView, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";

class WebViewHosting extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
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
