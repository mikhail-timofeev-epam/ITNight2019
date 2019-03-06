import { handleActions } from "redux-actions";
import _ from "lodash";
import { BeaconActionTypes, ApiActionTypes } from "../actions/actionsTypes";
import { DEFAULT_UUID } from "../constants";
import { STATION_TYPES } from "../constants/";

const mockStations = {
    "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6|0|2": {
        name: "OLOLO",
        type: STATION_TYPES.MASTER,
        beacon: {
            uid: "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
            major: "0",
            minor: "2",
        },
    },
};

const initialState = {
    beacons: [],
    isSearching: true,
    stations: mockStations,
    errors: {
        stationsRequest: false,
    },
};

const mapBeaconToId = (uuid, major, minor) => {
    // TODO: use real UUID instead default. See next commented line
    // return `${uuid.toLowerCase()}(${major}/${minor})`
    // TODO: remove then server uuids will be synchronized with local
    return `${uuid.toLowerCase()}|${major}|${minor}`;
};

/**
 * Beacon: {
 *  uuid: string,
 *  major: number,
 *  minor: number,
 *  distance: number
 * }
 */
function processBeacons(beacons) {
    return beacons.map(beacon => {
        return {
            id: mapBeaconToId(beacon.uuid, beacon.major, beacon.minor),
            distance: beacon.distance || beacon.accuracy,
        };
    });
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
    const stations = {};
    for (const station of action.payload) {
        const id = mapBeaconToId(station.beacon.uid, station.beacon.major, station.beacon.minor);
        stations[id] = station;
    }
    return {
        ...state,
        stations,
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
        [BeaconActionTypes.BEACON_DID_RANGE]: handleBeaconsChanged,
        [BeaconActionTypes.BEACON_SEARCHING]: handleBeaconsSearching,
        [ApiActionTypes.GET_ALL_STATIONS_REQUEST]: handleGetStationsRequest,
        [ApiActionTypes.GET_ALL_STATIONS_SUCCESS]: handleGetStationsSuccess,
        [ApiActionTypes.GET_ALL_STATIONS_FAILURE]: handleGetStationsFailure,
    },
    initialState
);
