import { handleActions } from "redux-actions";
import _ from "lodash";
import { BeaconActionTypes, ApiActionTypes } from "../actions/actionsTypes";
import { DEFAULT_UUID } from "../constants";
import { STATION_TYPES, MAX_DISTANCE } from "../constants";

const mockStations = {
    "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6|0|2": {
        name: "Bazar",
        type: STATION_TYPES.BAZAR,
        beacon: {
            uid: "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
            major: "0",
            minor: "2",
        },
    },
    "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6|0|3": {
        name: "Corovan 1",
        type: STATION_TYPES.CARAVAN,
        beacon: {
            uid: "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
            major: "0",
            minor: "3",
        },
    },
    "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6|0|3": {
        name: "Corovan 2",
        type: STATION_TYPES.CARAVAN,
        beacon: {
            uid: "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
            major: "0",
            minor: "4",
        },
    },
};

const initialState = {
    beacons: [],
    isSearching: true,
    stations: mockStations,
    beaconStations: [],
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

function getVisibleStations(beacons, stations, maxDistance = MAX_DISTANCE) {
    const locatedStations = [];
    const locatedBeacons = beacons.filter(
        beacon =>
            !Number.isNaN(beacon.distance) && beacon.distance >= 0 && beacon.distance <= maxDistance
    );

    for (const beacon of locatedBeacons) {
        if (stations[beacon.id]) {
            locatedStations.push(stations[beacon.id]);
        }
    }

    return locatedStations;
};


function processBeaconStations(beacons, stations) {
    let beaconStations = [];
    const visibleStations = getVisibleStations(beacons, stations);

    beacons.forEach(beacon => {
        const index = visibleStations.findIndex(
            station =>
                `${station.beacon.uid}|${station.beacon.major}|${station.beacon.minor}` ===
                beacon.id
        );
        const station = visibleStations[index];
        if (station) {
            beaconStations.push({
                ...beacon,
                name: station.name,
                quizId: station.quizId,
                type: station.type,
                description: station.description,
            });
        }
    });
    return beaconStations;
};

function processBeacons(beacons) {
    return beacons.map(beacon => {
        return {
            id: mapBeaconToId(beacon.uuid, beacon.major, beacon.minor),
            distance: beacon.distance || beacon.accuracy,
        };
    });
}

function handleBeaconsChanged(state, action) {
    const beacons = processBeacons(action.payload);
    const beaconStations = processBeaconStations(beacons, state.stations);

    return {
        ...state,
        beacons,
        beaconStations,
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
    };
}

function handleGetStationsSuccess(state, action) {
    const stations = {};
    for (const station of action.payload) {
        const id = mapBeaconToId(station.beacon.uid, station.beacon.major, station.beacon.minor);
        stations[id] = station;
    }
    const beaconStations = processBeaconStations(state.beacons, stations);

    return {
        ...state,
        stations,
        beaconStations,
    };
}

function handleGetStationsFailure(state) {
    return {
        ...state,
        errors: {
            ...state.errors,
            stationsRequest: true,
        },
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
