import beaconActions from "./BeaconActions";
import apiAction from "./ApiActions";
import navigationActions from "./NavigationActions";

export default {
    ...beaconActions,
    ...apiAction,
    ...navigationActions,
};
