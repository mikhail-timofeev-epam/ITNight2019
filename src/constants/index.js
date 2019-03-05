import keymirror from "keymirror";
export const DEFAULT_UUID = "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6";
export const REGION = "CATCH_THE_ASTEROID_REGION";

export const MAX_DISTANCE = 12;

export const STATION_TYPES = keymirror({
    MASTER: true,
    STATION: true,
    BAZAR: true,
    CARAVAN: true,
});

export const AUTH_TYPES = {
    EMAIL: "EMAIL",
    VK: "VK",
    GOOGLE: "GOOGLE",
};
