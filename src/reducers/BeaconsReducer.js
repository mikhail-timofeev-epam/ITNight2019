import { handleActions } from "redux-actions";
import _ from "lodash";
import { BeaconActionTypes, ApiActionTypes } from "../actions/actionsTypes";
import { DEFAULT_UUID } from "../constants";

const initialState = {
    beacons: [],
    isSearching: true,
    stations: [],
    errors: {
        stationsRequest: false,
    },
};

function processBeacons(beacons) {
    return beacons
        .map(item => {
            return {
                uuid: item.uuid.toLowerCase(),
                major: item.major,
                minor: item.minor,
                distance: item.distance || item.accuracy,
            };
        })
        .filter(beacon => beacon.uuid === DEFAULT_UUID);
}

function handleBeaconsChanged(state, action) {
    return {
        ...state,
        beacons: processBeacons(action.payload),
    };
}

function handleBeaconsSearching(state, action) {
    return {
        ...state,
        isSearching: action.payload && (!state.items || state.items.length == 0),
    };
}

function handleGetStationsRequest(state) {
    return {
        ...state,
        errors: {
            ...state.errors,
            stationsRequest: false,
        },
        stations: [],
    };
}

function handleGetStationsSuccess(state, action) {
    return {
        ...state,
        stations: action.payload,
    };
}

function handleGetStationsFailure(state) {
    return {
        ...state,
        errors: {
            ...state.errors,
            stationsRequest: true,
        },
        stations: [],
    };
}

export default handleActions(
    {
        [BeaconActionTypes.ACTION_BEACON_DID_RANGE]: handleBeaconsChanged,
        [BeaconActionTypes.ACTION_BEACON_SEARCHING]: handleBeaconsSearching,
        [ApiActionTypes.GET_ALL_STATIONS_REQUEST]: handleGetStationsRequest,
        [ApiActionTypes.GET_ALL_STATIONS_SUCCESS]: handleGetStationsSuccess,
        [ApiActionTypes.GET_ALL_STATIONS_FAILURE]: handleGetStationsFailure,
    },
    initialState
);
