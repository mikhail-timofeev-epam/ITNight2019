import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES } from "../constants";

class Main extends Component {
    componentDidMount() {
        this.props.startRanging(null);
        this.props.getAllStations();
    }

    componentWillUnmount() {
        this.props.stopRanging(null);
    }

    render() {
        return (
            <View>
                <Text>{this.props.isSearching ? "Searching..." : "Found:"}</Text>
                <Text>Beacons</Text>
                {this.props.beacons.map(beacon => {
                    const beaconsInfo = `${beacon.id} - ${Math.ceil(beacon.distance * 100) / 100}`;
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
        );
    }
}

function mapStateToProps(state) {
    return {
        beacons: state.beacons.beacons,
        isSearching: state.beacons.isSearching,
        stations: getVisibleStations(state),
    };
}

export default connect(mapStateToProps, actions)(Main);
