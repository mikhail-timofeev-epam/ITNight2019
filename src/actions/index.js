import beaconActions from "./BeaconActions";
import apiAction from "./ApiActions";
import navigationActions from "./NavigationActions";
import mainActions from "./MainActions";

export default {
    ...beaconActions,
    ...apiAction,
    ...navigationActions,
    ...mainActions,
};
