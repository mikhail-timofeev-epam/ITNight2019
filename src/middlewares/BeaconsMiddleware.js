import _ from "lodash";
import { DeviceEventEmitter, Alert } from "react-native";
import Beacons from "react-native-beacons-manager";
import { BluetoothStatus } from "react-native-bluetooth-status";
import beaconActions from "../actions/BeaconActions";
import { BeaconActionTypes } from "../actions/actionsTypes";
import { REGION } from "../constants";
import BeaconsManager from "./BeaconsManager";
import { AppState } from "react-native";

export default store => {
    const beaconsManager = new BeaconsManager(store.dispatch);
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
