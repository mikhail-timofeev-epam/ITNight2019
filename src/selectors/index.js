import { MAX_DISTANCE } from "../constants";

export const getVisibleStations = state => {
    const { beacons, stations } = state.beacons;
    const locatedStations = [];
    const locatedBeacons = beacons.filter(beacon => beacon.distance < MAX_DISTANCE);

    // TODO: Uncomment next lines then server beacons will same as devices
    // for (const beacon of locatedBeacons) {
    //     if (stations[beacon.id]) {
    //         locatedStations.push(stations[beacon.id]);
    //     }
    // }

    // TODO: Remove next lines then server beacons will same as devices
    for (const key in stations) {
        locatedStations.push(stations[key]);
    }

    return locatedStations;
};
