import { handleActions } from "redux-actions";
import _ from "lodash";
import { BeaconActionTypes } from "../actions/actionsTypes";
import { DEFAULT_UUID } from "../constants";

const initialState = {
    items: [],
    isSearching: true,
};

function processBeacons(beacons) {
    return beacons
        .map(item => {
            return ({
                uuid: item.uuid.toLowerCase(),
                major: item.major,
                minor: item.minor,
                distance: item.distance || item.accuracy,
            });
        })
        .filter(beacon => beacon.uuid === DEFAULT_UUID);
}

function handleBeaconsChanged(state, action) {
    return {
        ...state,
        items: processBeacons(action.payload),
    };
}

function handleBeaconsSearching(state, action) {
    return {
        ...state,
        isSearching: action.payload && (!state.items || state.items.length == 0),
    };
}

export default handleActions(
    {
        [BeaconActionTypes.ACTION_BEACON_DID_RANGE]: handleBeaconsChanged,
        [BeaconActionTypes.ACTION_BEACON_SEARCHING]: handleBeaconsSearching,
    },
    initialState
);
