import _ from "lodash";
import { Alert } from "react-native";
import { BluetoothStatus } from "react-native-bluetooth-status";
import beaconActions from "../actions/BeaconActions";
import { BeaconActionTypes } from "../actions/actionsTypes";
import BeaconsManager from "./BeaconsManager";
import { AppState } from "react-native";

let appState = "";

export default store => {
    const beaconsManager = new BeaconsManager(store.dispatch);
    AppState.addEventListener("change", nextAppState => {
        if (appState.match(/inactive|background/) && nextAppState === "active") {
            store.dispatch(beaconActions.startRanging());
        } else if (nextAppState.match(/inactive|background/) && appState === "active") {
            store.dispatch(beaconActions.stopRanging());
        }
        appState = nextAppState;
    });
    return next => action => {
        switch (action.type) {
            case BeaconActionTypes.BEACON_START_RANGING:
                beaconsManager.startRanging();

                BluetoothStatus.state()
                    .then(isEnabled => {
                        if (!isEnabled) {
                            Alert.alert(
                                null,
                                "Пожалуйста, включите Bluetooth в настройках",
                                [{ text: "OK" }],
                                {
                                    cancelable: true,
                                }
                            );
                        }
                    })
                    .catch(error => console.log("Bluetooth status error", error));
                break;
            case BeaconActionTypes.BEACON_STOP_RANGING:
                beaconsManager.stopRanging();
                break;
        }
        next(action);
    };
};
