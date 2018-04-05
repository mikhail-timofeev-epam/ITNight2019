import { createAction } from "redux-actions";
import { BeaconActionTypes } from "./actionsTypes";

const beaconsChanged = createAction(BeaconActionTypes.ACTION_BEACON_DID_RANGE);
const startRanging = createAction(BeaconActionTypes.ACTION_START_RANGING);
const stopRanging = createAction(BeaconActionTypes.ACTION_STOP_RANGING);
const searching = createAction(BeaconActionTypes.ACTION_BEACON_SEARCHING);

export default {
    beaconsChanged,
    startRanging,
    stopRanging,
    searching,
};
