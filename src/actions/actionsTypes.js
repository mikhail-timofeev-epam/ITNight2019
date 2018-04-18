import keymirror from "keymirror";

export const BeaconActionTypes = keymirror({
    ACTION_START_RANGING: true,
    ACTION_STOP_RANGING: true,
    ACTION_BEACON_DID_RANGE: true,
    ACTION_BEACON_SEARCHING: true,
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
