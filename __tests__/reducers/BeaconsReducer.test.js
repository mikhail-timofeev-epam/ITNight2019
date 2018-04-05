import reducer from "../../src/reducers/BeaconsReducer";
import { BeaconActionTypes, ApiActionTypes } from "../../src/actions/actionsTypes";

describe("Beacons reducer", ()=>{
    test("should handle beacons changes", ()=> {
        // Given
        const beacons = [{
            uuid: "8de6b7d6-c74f-4646-a733-6652878626da",
            major: 42,
            minor: 33,
            distance: 30
        },{
            uuid: "8de6b7d6-c74f-4646-a733-6652878626da",
            major: 42,
            minor: 34,
            distance: 25
        }];

        const action = {
            type: BeaconActionTypes.ACTION_BEACON_DID_RANGE,
            payload: beacons
        }

        // When
        const actualState = reducer({beacons: [] }, action);

        // Then 
        expect(actualState.beacons).toContainEqual({id: "8de6b7d6-c74f-4646-a733-6652878626da|42|33", distance: 30});
        expect(actualState.beacons).toContainEqual({id: "8de6b7d6-c74f-4646-a733-6652878626da|42|34", distance: 25});
    })

    test("should handle stations receiving", ()=> {
        // Given
        const stations = [
            {
                "id": 1,
                "name": "Java Quiz!!",
                "type": "MASTER",
                "beacon": {
                    "major": "0",
                    "minor": "0",
                    "uid": "57e32541-db1f-43c9-8e5f-1735f7e209e3"
                },
                "quizId": 1
            },
            {
                "id": 2,
                "name": "Some Offline Game",
                "type": "STATION",
                "beacon": {
                    "major": "0",
                    "minor": "0",
                    "uid": "cf163457-be37-49e8-b73b-35029146284b"
                },
                "quizId": null
            }
        ];

        const action = {
            type: ApiActionTypes.GET_ALL_STATIONS_SUCCESS,
            payload: stations
        }

        // When
        const actualState = reducer({stations: {} }, action);

        // Then 
        expect(actualState.stations["57e32541-db1f-43c9-8e5f-1735f7e209e3|0|0"]).toEqual(stations[0]);
        expect(actualState.stations["cf163457-be37-49e8-b73b-35029146284b|0|0"]).toEqual(stations[1]);
    })
});