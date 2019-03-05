import React, { Component } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";
import { Routes } from "../rootNavigator";
import Cosmo from "../components/cosmo/Cosmo";
import Tutorual from "../components/tutorial/Tutorual";
import colors from "../constants/colors";

class Main extends Component {
    state = {
        beaconStations: [],
    };

    componentDidMount() {
        this.props.startRanging();
        this.props.getAllStations();
        this.props.updateMainScreenHeader();
    }

    componentWillUnmount() {
        this.props.stopRanging();
    }

    componentWillReceiveProps(nextProps) {
        this.syncBeaconStations(nextProps);
        if (!this.props.isVisible && nextProps.isVisible) {
            this.props.updateMainScreenHeader();
        }
    }

    syncBeaconStations = props => {
        let beaconStations = [];
        props.beacons.forEach(beacon => {
            const index = props.stations.findIndex(
                station =>
                    `${station.beacon.uid}|${station.beacon.major}|${station.beacon.minor}` ===
                    beacon.id
            );
            const station = props.stations[index];
            if (station) {
                beaconStations.push({
                    ...beacon,
                    name: station.name,
                    quizId: station.quizId,
                    type: station.type,
                    description: station.description,
                });
            }
        });
        this.setState({ beaconStations });
    };

    handleObjectCapture = object => {
        this.props.openQuiz(object.quizId);
    };

    handleTutorialPress = () => {
        this.props.hideTutorial();
    };

    render() {
        if (this.props.isFirstRun) {
            return <Tutorual onPress={this.handleTutorialPress} />;
        }
        return (
            <View style={styles.container}>
                <Cosmo
                    objects={this.state.beaconStations}
                    maxDistance={MAX_DISTANCE}
                    onObjectCapture={this.handleObjectCapture}
                />
                <View>
                    <Text>werwerwer</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        beacons: state.beacons.beacons,
        isFirstRun: state.main.isFirstRun,
        isSearching: state.beacons.isSearching,
        stations: getVisibleStations(state, MAX_DISTANCE),
        isVisible:
            state.rootNavigation.root.routes[state.rootNavigation.root.index].routeName ===
            Routes.Main,
    };
}

export default connect(mapStateToProps, actions)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomButton: {
        position: "absolute",
        zIndex: 10,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.blue,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
    },
    buttonText: {
        paddingVertical: 18,
        fontSize: 18,
        color: colors.text,
    },
});
