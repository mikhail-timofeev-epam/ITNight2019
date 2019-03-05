import { createAction } from "redux-actions";
import { PlayerActionTypes } from "../actions/actionsTypes";

// const pressOnMarker = createAction(PlayerActionTypes.PRESS_ON_MARKER);

const pressOnMarker = markerId => (dispatch, getState) => {
    const currentUserId = getState().player; //
};

export default {
    pressOnMarker,
};
