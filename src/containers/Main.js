import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";

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
                <Text>{this.props.beacons.isSearching ? "Searching..." : "Found:"}</Text>
                <Text>Beacons</Text>
                {this.props.beacons.beacons.map(beacon => {
                    const beaconsInfo = `${beacon.uuid} (${beacon.major}/${
                        beacon.minor
                    }) - ${Math.ceil(beacon.distance * 100) / 100}`;
                    return <Text key={beacon.uuid}>{beaconsInfo}</Text>;
                })}
                <Text>Stations</Text>
                {this.props.beacons.stations.map(station => {
                    const stationInfo = `${station.name}: ${station.beacon.uid} (${
                        station.beacon.major
                    }/${station.beacon.minor})`;
                    return <Text key={station.beacon.uid}>{stationInfo}</Text>;
                })}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { beacons: state.beacons };
}

export default connect(mapStateToProps, actions)(Main);
