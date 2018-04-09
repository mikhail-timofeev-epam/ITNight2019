import React, { PureComponent } from "react";
import { WebView } from "react-native";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";

class WebViewHosting extends PureComponent {
    render() {
        return <WebView source={{ uri: this.props.uri }} />;
    }
}

function mapStateToProps(state, props) {
    return {
        uri: props.navigation.state.params.uri,
    };
}

export default connect(mapStateToProps, actions)(WebViewHosting);
