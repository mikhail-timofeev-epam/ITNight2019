import _ from "lodash";
import { DeviceEventEmitter, Alert } from "react-native";
import Beacons from "react-native-beacons-manager";
import { BluetoothStatus } from "react-native-bluetooth-status";
import beaconActions from "../actions/BeaconActions";
import { BeaconActionTypes } from "../actions/actionsTypes";
import { REGION } from "../constants";

const debouncedCleanFunction = _.debounce(dispatch => dispatch(beaconsChanged([])), 10000, {
    leading: false,
    trailing: true,
});

let isRanging = false;

export default store => {
    return next => action => {
        switch (action.type) {
            case BeaconActionTypes.ACTION_START_RANGING:
            isRanging=  true;
            console.log("BluetoothStatus>>>>>", BluetoothStatus)
                BluetoothStatus.state().then(isEnabled => {
                    console.log("BluetoothStatus>>>>>isEnabled",isEnabled)
                    if (isEnabled) {
                        Beacons.detectIBeacons();

                        Beacons.startRangingBeaconsInRegion(REGION)
                            .then(() => console.log("Beacons ranging started successfully!"))
                            .catch(err => console.log(`Beacon ranging not started, error ${err}`));

                        DeviceEventEmitter.addListener("beaconsDidRange", data => {
                            if (data.beacons && data.beacons.length != 0) {
                                store.dispatch(beaconActions.beaconsChanged(data.beacons));
                                debouncedCleanFunction(store.dispatch);
                            }
                            store.dispatch(
                                beaconActions.searching(!data.beacons || data.beacons.length == 0)
                            );
                        });
                    } else {
                        Alert.alert(null, "Включите Bluetooth в настройках", [{ text: "OK" }], {
                            cancelable: true,
                        });
                    }
                })
                .catch(error=>console.log("BluetoothStatus>>>>>Error", error));

                break;
            case BeaconActionTypes.ACTION_STOP_RANGING:
            isRanging=  false;
                DeviceEventEmitter.removeListener("beaconsDidRange");

                Beacons.stopRangingBeaconsInRegion(REGION)
                    .then(() => console.log("Beacons ranging stopped successfully!"))
                    .catch(err => console.log(`Beacon ranging not stopped, error ${err}`));
                break;
        }
        next(action);
    };
};
