import _ from "lodash";
import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";
import beaconActions from "../actions/BeaconActions";
import { BeaconActionTypes } from "../actions/actionsTypes";
import { REGION } from "../constants";

const debouncedCleanFunction = _.debounce(dispatch => dispatch(beaconsChanged([])), 10000, {
    leading: false,
    trailing: true,
});

export default store => {
    return next => action => {
        switch (action.type) {
            case BeaconActionTypes.ACTION_START_RANGING:
                Beacons.detectIBeacons();

                Beacons.startRangingBeaconsInRegion(REGION)
                    .then(() => console.log("Beacons ranging started successfully!"))
                    .catch(err => console.log(`Beacon ranging not started, error ${err}`));

                DeviceEventEmitter.addListener("beaconsDidRange", data => {
                    if (data.beacons && data.beacons.length != 0) {
                        store.dispatch(beaconActions.beaconsChanged(data.beacons));
                        debouncedCleanFunction(store.dispatch);
                    }
                    store.dispatch(beaconActions.searching(!data.beacons || data.beacons.length == 0));
                });

                break;
            case BeaconActionTypes.ACTION_STOP_RANGING:
                DeviceEventEmitter.removeListener("beaconsDidRange");

                Beacons.stopRangingBeaconsInRegion(REGION)
                    .then(() => console.log("Beacons ranging stopped successfully!"))
                    .catch(err => console.log(`Beacon ranging not stopped, error ${err}`));
                break;
        }
        next(action);
    };
};
