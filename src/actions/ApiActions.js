import { createAction } from "redux-actions";
import { ApiActionTypes } from "./actionsTypes";

// See http://ecsc00a017ee.epam.com:8090/swagger-ui.html#/

const ENDPOINT = "http://ecsc00a017ee.epam.com:8090/";
const ALL_STATIONS = ENDPOINT + "station";

const getAllStations = () => dispatch => {
    dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_REQUEST));
    return fetch(ALL_STATIONS)
        .then(response => response.json())
        .then(response => dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_SUCCESS)(response)))
        .catch(error => dispatch(createAction(ApiActionTypes.GET_ALL_STATIONS_FAILURE)(error)));
};

export default { getAllStations };
