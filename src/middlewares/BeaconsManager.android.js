import _ from "lodash";
import { DeviceEventEmitter, Alert } from "react-native";
import Beacons from "react-native-beacons-manager";
import { BluetoothStatus } from "react-native-bluetooth-status";
import beaconActions from "../actions/BeaconActions";
import { BeaconActionTypes } from "../actions/actionsTypes";
import { REGION } from "../constants";

import { NativeModules, DeviceEventEmitter, NativeEventEmitter } from "react-native";

const { RNBluetoothManager } = NativeModules;

const debouncedCleanFunction = _.debounce(dispatch => dispatch(beaconsChanged([])), 10000, {
    leading: false,
    trailing: true,
});

class BeaconsManager {
    constructor(dispatch) {
        this.isRangingRequested = false;
        this.isRanging = false;
        this.dispatch = dispatch;

        this.beaconsChangesSubscription = null;
        this.bleStatusSubscription = null;
    }

    startRanging() {
        isRangingRequested = true;
        return new Promise((resolve, reject) => {
            BluetoothStatus.state()
                .then(isEnabled => {
                    console.log("BluetoothStatus>>>>>isEnabled", isEnabled);
                    if (isEnabled) {
                        Beacons.detectIBeacons();

                        Beacons.startRangingBeaconsInRegion(REGION)
                            .then(() => {
                                this.isRanging = true;
                                this._subscribeOnBeaconsChanges();
                            })
                            .catch(err => console.log(`Beacon ranging not started, error ${err}`));
                    } else {
                        Alert.alert(null, "Включите Bluetooth в настройках", [{ text: "OK" }], {
                            cancelable: true,
                        });
                    }
                })
                .catch(error => console.log("BluetoothStatus>>>>>Error", error));
        });
    }

    stopRanging() {
        isRangingRequested = false;
    }

    _subscribeOnBleStatusChanges = () => {
        this.bleStatusSubscription = new NativeEventEmitter(RNBluetoothManager).addListener(
            "bluetoothStatus",
            (manager, responseArray) => {
                const bluetoothState = responseArray[0];
                if (bluetoothState === "on") {
                    if (this.isRangingRequested && !this.isRanging) {
                        this.startRanging();
                    }
                } else if (bluetoothState === "off") {
                    this.startRanging();
                }
            }
        );
    };

    _subscribeOnBeaconsChanges = () => {
        this.beaconsChangesSubscription = DeviceEventEmitter.addListener(
            "beaconsDidRange",
            data => {
                if (data.beacons && data.beacons.length != 0) {
                    this.dispatch(beaconActions.beaconsChanged(data.beacons));
                    debouncedCleanFunction(this.dispatch);
                }
                store.dispatch(beaconActions.searching(!data.beacons || data.beacons.length == 0));
            }
        );
    };

    _unSubscribeFromBeaconsChanges = () => {
        if (this.beaconsChangesSubscription) {
            this.beaconsChangesSubscription.remove();
            this.beaconsChangesSubscription = null;
        }
    };
}

export default store => {
    return next => action => {
        switch (action.type) {
            case BeaconActionTypes.ACTION_START_RANGING:
                isRanging = true;
                console.log("BluetoothStatus>>>>>", BluetoothStatus);
                BluetoothStatus.state()
                    .then(isEnabled => {
                        console.log("BluetoothStatus>>>>>isEnabled", isEnabled);
                        if (isEnabled) {
                            Beacons.detectIBeacons();

                            Beacons.startRangingBeaconsInRegion(REGION)
                                .then(() => console.log("Beacons ranging started successfully!"))
                                .catch(err =>
                                    console.log(`Beacon ranging not started, error ${err}`)
                                );

                            DeviceEventEmitter.addListener("beaconsDidRange", data => {
                                if (data.beacons && data.beacons.length != 0) {
                                    store.dispatch(beaconActions.beaconsChanged(data.beacons));
                                    debouncedCleanFunction(store.dispatch);
                                }
                                store.dispatch(
                                    beaconActions.searching(
                                        !data.beacons || data.beacons.length == 0
                                    )
                                );
                            });
                        } else {
                            Alert.alert(null, "Включите Bluetooth в настройках", [{ text: "OK" }], {
                                cancelable: true,
                            });
                        }
                    })
                    .catch(error => console.log("BluetoothStatus>>>>>Error", error));

                break;
            case BeaconActionTypes.ACTION_STOP_RANGING:
                isRanging = false;
                DeviceEventEmitter.removeListener("beaconsDidRange");

                Beacons.stopRangingBeaconsInRegion(REGION)
                    .then(() => console.log("Beacons ranging stopped successfully!"))
                    .catch(err => console.log(`Beacon ranging not stopped, error ${err}`));
                break;
        }
        next(action);
    };
};
