import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";
import { Routes } from "../rootNavigator";
import Cosmo from "../components/cosmo/Cosmo";

class Main extends Component {
  state = {
    beaconStations: []
  };

  componentDidMount() {
    this.props.startRanging(null);
    this.props.getAllStations();
  }

  componentWillUnmount() {
    this.props.stopRanging(null);
  }

  componentWillReceiveProps(nextProps) {
    this.syncBeaconStations(nextProps);
  }

  syncBeaconStations = (props) => {
    let beaconStations = [];
    props.beacons.forEach((beacon) => {
      const index = props.stations.findIndex((station) =>
        `${station.beacon.uid}|${station.beacon.major}|${station.beacon.minor}` === beacon.id);
      const station = props.stations[index];
      beaconStations.push({ ...beacon, name: station && station.name });
    });
    this.setState({ beaconStations })
  };

  moveToDashboard = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: Routes.WebViewHosting,
        params: { uri: "http://bash.im" },
      })
    );
  };

  handleObjectCapture = (object) => {
    console.warn('Go to ' + object.name);
  };

  render() {
    return (
      <View style={styles.container}>
        <Cosmo
          objects={this.state.beaconStations}
          maxDistance={MAX_DISTANCE}
          onObjectCapture={this.handleObjectCapture}
        />
        <Button
          title="Go to dashboard"
          onPress={this.moveToDashboard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
