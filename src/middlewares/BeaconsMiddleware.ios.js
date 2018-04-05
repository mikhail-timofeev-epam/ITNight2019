import _ from "lodash";
import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";
import { DEFAULT_UUID, REGION } from "../constants";
import { searching, beaconsChanged } from "../actions";
import { BeaconActionTypes } from "../actions/actionsTypes";

const debouncedCleanFunction = _.debounce(dispatch => dispatch(beaconsChanged([])), 10000, {
    leading: false,
    trailing: true,
});

export default store => next => action => {
    switch (action.type) {
        case BeaconActionTypes.ACTION_START_RANGING:
            {
                DeviceEventEmitter.addListener("authorizationStatusDidChange", info =>
                    console.log("authorizationStatusDidChange: ", info)
                );

                Beacons.requestWhenInUseAuthorization();

                const region = { identifier: REGION, uuid: action.payload || DEFAULT_UUID };
                Beacons.startRangingBeaconsInRegion(region);

                DeviceEventEmitter.addListener("beaconsDidRange", data => {
                    console.log("Found beacons!", data.beacons);
                    if (data.beacons && data.beacons.length != 0) {
                        store.dispatch(beaconsChanged(data.beacons));
                        debouncedCleanFunction(store.dispatch);
                    }
                    store.dispatch(searching(!data.beacons || data.beacons.length == 0));
                });
            }
            break;
        case BeaconActionTypes.ACTION_STOP_RANGING:
            {
                DeviceEventEmitter.removeListener("beaconsDidRange");

                let region = { identifier: REGION, uuid: DEFAULT_UUID };
                if (action.payload) {
                    region.uuid = action.payload;
                }
                Beacons.stopRangingBeaconsInRegion(region);
            }
            break;
    }
    next(action);
};
