import React, { Component } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";
import { getVisibleStations } from "../selectors";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";
import { Routes } from "../rootNavigator";
import Cosmo from "../components/cosmo/Cosmo";
import colors from "../constants/colors";

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
      if (station) {
        beaconStations.push({ ...beacon, name: station.name, quizId: station.quizId });
      }
    });
    this.setState({ beaconStations })
  };

  moveToDashboard = () => {
    this.props.openDashboard();
  };

  handleObjectCapture = (object) => {
    this.props.openQuiz(object.quizId);
  };

  render() {
    return (
      <View style={styles.container}>
        <Cosmo
          objects={this.state.beaconStations}
          maxDistance={MAX_DISTANCE}
          onObjectCapture={this.handleObjectCapture}
        />
        <TouchableOpacity
          onPress={this.moveToDashboard}
          style={styles.bottomButton}
        >
          <Text style={styles.buttonText}>
            {'Go to dashboard'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8
  },
  buttonText: {
    paddingVertical: 18,
    fontSize: 18,
    color: colors.text
  }
});

function mapStateToProps(state) {
  return {
    beacons: state.beacons.beacons,
    isSearching: state.beacons.isSearching,
    stations: getVisibleStations(state, MAX_DISTANCE),
  };
}

export default connect(mapStateToProps, actions)(Main);
