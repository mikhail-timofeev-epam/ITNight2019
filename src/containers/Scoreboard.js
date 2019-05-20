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
import _ from "lodash";

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
                {this.renderScoreboard()}
            </View>
        );
    }

    renderScoreboard = () => {
        let scoreboard = this.props.scoreboardData.sort(function(a, b) {
            if (!a.score) {
                a.score = 0;
            }
            if (!b.score) {
                b.score = 0;
            }
            return b.score - a.score
        });
        if (this.props.scoreboardData) {
            return <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        data={scoreboard}
                        renderItem={this.renderItem}
                    />
        } else {
            return <View>
                        <Text>Видимо ещё нет участников :(</Text>
                        <Text>Стань первым! Начни грабить корованы!</Text>
                    </View>
        }
    }

    renderItem = ({ item }) => (
        <View style={styles.scorelist}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{this.renderScore(item.score)}</Text>
        </View>
    );

    renderScore = (score) => {
        return score ? score : 0;
    }

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
        scoreboardData: _.reduce(state.scoreboardData.scoreboardData, (acc, item, key) => {
            acc.push({id: key,...item});
            return acc;
        }, []),
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
