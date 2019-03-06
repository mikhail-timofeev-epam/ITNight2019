import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
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
                    objects={this.props.beaconStations}
                    maxDistance={MAX_DISTANCE}
                    onObjectCapture={this.handleObjectCapture}
                />
                <View>
                    <Text>Здесь будет ваш инвентарь, а сейчас здесь пусто.</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFirstRun: state.main.isFirstRun,
        isSearching: state.beacons.isSearching,
        beaconStations: state.beacons.beaconStations,
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
