import { StyleSheet } from "react-native";
import constants from "./Constants";

export default StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    planetWrapper: {
        zIndex: 0,
        position: "absolute",
        height: constants.gravityRadius * 2,
        width: constants.gravityRadius * 2,
        borderRadius: constants.gravityRadius,
    },
    objectWrapper: {
        zIndex: 0,
        position: "absolute",
        height: constants.minObjectRadius * 2,
        width: constants.minObjectRadius * 2,
        borderRadius: constants.minObjectRadius,
    },
    objectName: {
        position: "absolute",
        fontSize: 16,
        color: "white",
        textAlign: "left",
        backgroundColor: "black",
        paddingHorizontal: 2,
    },
    orbit: {
        backgroundColor: "transparent",
        borderColor: "rgba(256, 256, 256, 0.4)",
        borderWidth: 2,
        position: "absolute",
    },
    orbitText: {
        flex: -1,
        fontSize: 12,
        color: "rgba(256, 256, 256, 0.7)",
        textAlign: "center",
        paddingHorizontal: 2,
    },
});
