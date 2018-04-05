export const getVisibleStations = (state, maxDistance) => {
    const { beacons, stations } = state.beacons;
    const locatedStations = [];
    const locatedBeacons = beacons.filter(
        beacon =>
            !Number.isNaN(beacon.distance) && beacon.distance >= 0 && beacon.distance <= maxDistance
    );

    // TODO: remove after sync server uuids and beacons
    for (const key in stations) {
        locatedStations.push(stations[key]);
    }

    // TODO: uncomment after sync server uuids and beacons
    // for (const beacon of locatedBeacons) {
    //     if (stations[beacon.id]) {
    //         locatedStations.push(stations[beacon.id]);
    //     }
    // }

    return locatedStations;
};
