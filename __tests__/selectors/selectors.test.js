import { getVisibleStations } from "../../src/selectors";

const MAX_DISTANCE = 25;

describe("Selectors", ()=> {
    test("should get visible stations", ()=> {
        // Given
        const appState = {
            beacons: {
                beacons: [
                    {id:"uuid|0|1", distance: 10},
                    {id:"uuid|0|2", distance: MAX_DISTANCE},
                    {id:"uuid|0|3", distance: 30},
                ],
                stations: {
                    "uuid|0|1": {id: 1},
                    "uuid|0|2": {id: 1},
                    "uuid|0|3": {id: 1},
                }
            }
        }

        // When
        const visibleStations = getVisibleStations(appState, MAX_DISTANCE);

        // Then 
        expect(visibleStations).toHaveLength(2);
        expect(visibleStations).toContainEqual(appState.beacons.stations["uuid|0|1"]);
        expect(visibleStations).toContainEqual(appState.beacons.stations["uuid|0|2"]);
    });
})