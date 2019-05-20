import { StyleSheet } from "react-native";
import constants from "./../cosmo/Constants";

export default StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
    },
    backgroundImage: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
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
        // height: constants.minObjectRadius * 2,
        // width: constants.minObjectRadius * 2,
        // borderRadius: constants.minObjectRadius,
    },
    objectName: {
        position: "absolute",
        fontSize: 16,
        color: "white",
        textAlign: "left",
        paddingHorizontal: 2,
        width: constants.minObjectRadius * 4,
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
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    middle: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(256, 256, 256, 0.2)",
    },
    text: {
        flex: -1,
        fontSize: 15,
        color: "rgba(0, 0, 0, 0.9)",
        textAlign: "center",
        fontWeight: "bold",
        paddingHorizontal: 2,
    },
    description: {
        flex: -1,
        fontSize: 14,
        marginLeft: 20,
        color: "rgba(256, 256, 256, 0.9)",
        textAlign: "center",
        fontWeight: "700",
        paddingHorizontal: 2,
    },
    button: {
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(256, 256, 256, 0.9)",
        marginHorizontal: 20,
        marginBottom: 20,
    },
});
