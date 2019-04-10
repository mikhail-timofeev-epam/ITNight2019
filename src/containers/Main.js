import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert, FlatList } from "react-native";
import { connect } from "react-redux";
import actions from "../actions";
import { MAX_DISTANCE } from "../constants";
import { Routes } from "../rootNavigator";
import Cosmo from "../components/cosmo/Cosmo";
import Tutorual from "../components/tutorial/Tutorual";
import colors from "../constants/colors";

class Main extends Component {
    componentDidMount() {
        this.props.startRanging();
        this.props.getAllStations();
        this.props.updateMainScreenHeader();
    }

    componentWillUnmount() {
        this.props.stopRanging();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isVisible && nextProps.isVisible) {
            this.props.updateMainScreenHeader();
        }
    }

    handleObjectCapture = object => {
      switch (object.type) {
        case 'CARAVAN':
          if (this.props.randomStaff.length >= 5) {
            this.props.getFullCartAlert();
            return;
          } else {
            this.props.getRandomStaff();
            break;
          }
        case 'BAZAR':
          if (this.props.randomStaff.length === 0) {
            this.props.emptyCartBazarMessage();
          } else {
            this.props.goToBazar();
          }
          break;
        case 'POLICE':
        if (this.props.randomStaff.length === 0) {
          this.props.emptyCartPoliceMessage();
        } else {
          this.props.goToPolice();
        }
          break;
      }
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
                    objects={this.props.beaconStations}
                    maxDistance={MAX_DISTANCE}
                    onObjectCapture={this.handleObjectCapture}
                />
                <View style={styles.container}>
                  {this.renderCart()}
                </View>
            </View>
        );
    }

    renderCart = () => {
      if (this.props.randomStaff.length === 0) {
        return <Text style={styles.emptyCart}>Ты пуст! Время грабить корованы!</Text>
      }

      if (this.props.randomStaff.length >= 5) {
        return <View style={styles.container}>
                  <Text style={styles.fullCart}>Ты полон! Время сдать награбленное!</Text>
                  {this.getFlatList()}
                  <Text style={styles.totalScore}>Итого: {this.getTotalScore()}</Text>
              </View>
      }

      if (this.props.randomStaff.length < 5) {
        return <View>
          {this.getFlatList()}
          <Text style={styles.totalScore}>Итого: {this.getTotalScore()}</Text>
        </View>
      }
    }



    getTotalScore = () => {
      let result = 0;
      this.props.randomStaff.forEach(item => {
        result += item.score;
      })
      return result
    }

    getFlatList = () => {
      return <FlatList
              extraData={this.props}
              data={this.props.randomStaff}
              renderItem={this.renderItem}
            />
    }

    renderItem = ({ item }) => (
      <View style={styles.scorelist}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.score}>{item.score}</Text>
      </View>
  );
}

function mapStateToProps(state) {
    return {
        isFirstRun: state.main.isFirstRun,
        isSearching: state.beacons.isSearching,
        beaconStations: state.beacons.beaconStations,
        isVisible:
            state.rootNavigation.root.routes[state.rootNavigation.root.index].routeName ===Routes.Main,
        randomStaff: state.randomStaff.randomStaff
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
    scorelist: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    name: {
      fontSize: 18,
    },
    score: {
      fontSize: 20,
      fontWeight: "600",
    },
    emptyCart: {
      fontSize: 20,
      fontWeight: "600",
      color: "#4dcaae",
      textAlign: "center"
    },
    fullCart: {
      fontSize: 20,
      fontWeight: "600",
      color: "#af0b0b",
      textAlign: "center"
    },
    totalScore: {
      fontSize: 20,
      fontWeight: "800",
      padding: 10,
    }
});
