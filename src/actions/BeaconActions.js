import { createAction } from "redux-actions";
import { BeaconActionTypes } from "./actionsTypes";

const beaconsChanged = createAction(BeaconActionTypes.BEACON_DID_RANGE);
const startRanging = createAction(BeaconActionTypes.BEACON_START_RANGING);
const stopRanging = createAction(BeaconActionTypes.BEACON_STOP_RANGING);
const searching = createAction(BeaconActionTypes.BEACON_SEARCHING);

export default {
    beaconsChanged,
    startRanging,
    stopRanging,
    searching,
};
