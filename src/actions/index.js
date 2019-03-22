import beaconActions from "./BeaconActions";
import apiAction from "./ApiActions";
import navigationActions from "./NavigationActions";
import mainActions from "./MainActions";
import scoreboardActions from "./ScoreboardActions";

export default {
    ...beaconActions,
    ...apiAction,
    ...navigationActions,
    ...mainActions,
    ...scoreboardActions,
};
