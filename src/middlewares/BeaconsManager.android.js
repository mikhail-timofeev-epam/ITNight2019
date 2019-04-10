import _ from "lodash";
import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";
import beaconActions from "../actions/BeaconActions";
import { REGION } from "../constants";

const debouncedCleanFunction = _.debounce(dispatch => dispatch(beaconActions.beaconsChanged([])), 10000, {
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
            console.log("BeaconsManager(Android): start ranging");

            Beacons.detectIBeacons();

            Beacons.startRangingBeaconsInRegion(REGION)
                .then(() => {
                    this.isRanging = true;
                    this._subscribeOnBeaconsChanges();
                    console.log("BeaconsManager(Android): ranging started");
                })
                .catch(err => {
                    this.isRanging = false;
                    console.log(`BeaconsManager(Android): ranging not started, error ${err}`);
                });
        }
    }

    stopRanging() {
        console.log("BeaconsManager(Android): stop ranging");
        this.isRanging = false;
        Beacons.stopRangingBeaconsInRegion(REGION)
            .then(() => console.log("BeaconsManager(Android): ranging stopped successfully!"))
            .catch(err =>
                console.log(`BeaconsManager(Android): ranging not stopped, error ${err}`)
            );

        this._unSubscribeFromBeaconsChanges();
    }

    _subscribeOnBeaconsChanges = () => {
        if (!this.beaconsChangesSubscription) {
            console.log("BeaconsManager(Android): subscribe on beacons changes");
            this.beaconsChangesSubscription = DeviceEventEmitter.addListener(
                "beaconsDidRange",
                data => {
                    if (data.beacons && data.beacons.length != 0) {
                        this.dispatch(beaconActions.beaconsChanged(data.beacons));
                        debouncedCleanFunction(this.dispatch);
                    }
                    this.dispatch(
                        beaconActions.searching(!data.beacons || data.beacons.length == 0)
                    );
                }
            );
        }
    };

    _unSubscribeFromBeaconsChanges = () => {
        if (this.beaconsChangesSubscription) {
            console.log("BeaconsManager(Android): un subscribe from beacons changes");
            this.beaconsChangesSubscription.remove();
            this.beaconsChangesSubscription = null;
        }
    };
}
