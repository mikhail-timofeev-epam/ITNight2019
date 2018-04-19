import { createAction } from "redux-actions";

import keymirror from "keymirror";

export const MainActionTypes = keymirror({
  HIDE_TUTORIAL: true,
});

const hideTutorial = createAction(MainActionTypes.HIDE_TUTORIAL);

export default {
  hideTutorial
};
