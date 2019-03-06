import keymirror from "keymirror";

export const BeaconActionTypes = keymirror({
    BEACON_START_RANGING: true,
    BEACON_STOP_RANGING: true,
    BEACON_DID_RANGE: true,
    BEACON_SEARCHING: true,
});

export const ApiActionTypes = keymirror({
    GET_ALL_STATIONS_REQUEST: true,
    GET_ALL_STATIONS_SUCCESS: true,
    GET_ALL_STATIONS_FAILURE: true,

    GET_USER_REQUEST: true,
    GET_USER_SUCCESS: true,
    GET_USER_FAILURE: true,

    SAVE_USER_NAME_REQUEST: true,
    SAVE_USER_NAME_SUCCESS: true,
    SAVE_USER_NAME_FAILURE: true,

    LOGOUT: true,
});

export const PlayerActionTypes = keymirror({
    PRESS_ON_MARKER: true,
    ON_ADD_TO_BASKET: true,
    ON_CLEAR_BASKET: true,
});
