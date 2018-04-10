import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";
import { Routes } from "../rootNavigator";

class Main extends Component {
    componentDidMount() {
        this.props.startRanging(null);
        this.props.getAllStations();
    }

    componentWillUnmount() {
        this.props.stopRanging(null);
    }

    moveToDashboard = () => {
        this.props.openDashboard();
    };

    moveToQuiz = () => {
        this.props.openQuiz(1);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <Text>{this.props.isSearching ? "Searching..." : "Found:"}</Text>
                    <Text>Beacons</Text>
                    {this.props.beacons.map(beacon => {
                        const beaconsInfo = `${beacon.id} - ${Math.ceil(beacon.distance * 100) /
                            100}`;
                        return <Text key={beacon.uuid}>{beaconsInfo}</Text>;
                    })}
                    <Text>Stations</Text>
                    {this.props.stations.map(station => {
                        const type = station.type === STATION_TYPES.MASTER ? "M" : "S";
                        const stationInfo = `${station.name}(${type}): ${station.beacon.uid} (${
                            station.beacon.major
                        }/${station.beacon.minor})`;
                        return <Text key={station.beacon.uid}>{stationInfo}</Text>;
                    })}
                </View>
                <Button title="Go to quiz" onPress={this.moveToQuiz} />
                <Button title="Go to dashboard" onPress={this.moveToDashboard} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
    },
});

function mapStateToProps(state) {
    return {
        beacons: state.beacons.beacons,
        isSearching: state.beacons.isSearching,
        stations: getVisibleStations(state, MAX_DISTANCE),
    };
}

export default connect(mapStateToProps, actions)(Main);
