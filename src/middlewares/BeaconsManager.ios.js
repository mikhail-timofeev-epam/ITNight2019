import _ from "lodash";
import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";
import { DEFAULT_UUID, REGION } from "../constants";
import beaconActions from "../actions/BeaconActions";

const debouncedCleanFunction = _.debounce(dispatch => dispatch(beaconsChanged([])), 10000, {
    leading: false,
    trailing: true,
});

export default class BeaconsManager {
    constructor(dispatch) {
        this.isRanging = false;
        this.dispatch = dispatch;

        this.beaconsChangesSubscription = null;
    }

    startRanging() {
        if (!this.isRanging) {
            console.log("BeaconsManager(iOS): start ranging");
            DeviceEventEmitter.addListener("authorizationStatusDidChange", info =>
                console.log("BeaconsManager(iOS):  authorization status did change: ", info),
            );

            Beacons.requestWhenInUseAuthorization();

            const region = { identifier: REGION, uuid: DEFAULT_UUID };
            Beacons.startRangingBeaconsInRegion(region);
            console.log("BeaconsManager(iOS): ranging started");
            this._subscribeOnBeaconsChanges();
        }
    }

    stopRanging() {
        console.log("BeaconsManager(iOS): stop ranging");
        this.isRanging = false;
        const region = { identifier: REGION, uuid: DEFAULT_UUID };
        Beacons.stopRangingBeaconsInRegion(region);
        console.log("BeaconsManager(iOS): ranging stopped");

        this._unSubscribeFromBeaconsChanges();
    }

    _subscribeOnBeaconsChanges = () => {
        if (!this.beaconsChangesSubscription) {
            console.log("BeaconsManager(iOS): subscribe on beacons changes");
            this.beaconsChangesSubscription = DeviceEventEmitter.addListener(
                "beaconsDidRange",
                data => {
                    if (data.beacons && data.beacons.length != 0) {
                        this.dispatch(beaconActions.beaconsChanged(data.beacons));
                        debouncedCleanFunction(this.dispatch);
                    }
                    this.dispatch(
                        beaconActions.searching(!data.beacons || data.beacons.length == 0),
                    );
                },
            );
        }
    };

    _unSubscribeFromBeaconsChanges = () => {
        if (this.beaconsChangesSubscription) {
            console.log("BeaconsManager(iOS): un subscribe from beacons changes");
            this.beaconsChangesSubscription.remove();
            this.beaconsChangesSubscription = null;
        }
    };
}
