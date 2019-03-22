import React, { PureComponent } from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    BackHandler,
    Platform,
    FlatList,
    Text,
    RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import actions from "../actions";

class Scoreboard extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getScoreboardData();
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
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    data={this.props.scoreboardData}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }

    renderItem = ({ item }) => (
        <View style={styles.scorelist}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
        </View>
    );

    renderActivityIndicator() {
        if (this.props.scoreboardActivityIndicator) {
            return <ActivityIndicator size="large" style={styles.activityIndicator} />;
        }
    }

    handlerBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    onRefresh = () => {
        this.props.getScoreboardData();
    };
}

function mapStateToProps(state, props) {
    return {
        uri: props.navigation.state.params.uri,
        scoreboardData: state.scoreboardData.scoreboardData,
        scoreboardActivityIndicator: state.scoreboardData.scoreboardActivityIndicator,
        refreshing: state.scoreboardData.refreshing,
    };
}

export default connect(mapStateToProps, actions)(Scoreboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    activityIndicator: {
        height: 100,
        paddingTop: 16,
    },
    scorelist: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    name: {
        fontSize: 30,
    },
    score: {
        fontSize: 30,
        fontWeight: "600",
    },
});
