import _ from "lodash";
import React, { Component } from "react";
import { View, Image, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./CosmoStyles";
import constants from "./Constants";
import { STATION_TYPES } from "./../../constants/";
import { debounce } from "../../utils/handler";

import backgroundImage from "./images/desert_bg.jpg";
import centerImage from "./images/you.png";
import objectImage from "./images/bazaar.png";
import stationImage from "./images/korovan.png";

const ANGLES = [0, 3, 3.6, 4.2, 4.8, 5.6]; //for corovans will not fly in the sky
const ORBITS = 4;
const ORBIT_STEP_PX_DIVIDER = 13;

type Props = {
    objects?: array<{ name: string, id: number, distance: number }>,
    maxDistance: number, // in real measure (meters)
    onObjectCapture: any => void,
    orbits?: number,
};

type State = {
    xStart: number,
    yStart: number,
    width: number,
    height: number,
    objectsCoordinates: any,
    orbitStepPx: number,
    isMeasured: boolean,
};

function getBound(height = 0, width = 0) {
    return {
        height,
        width,
        xStart: width / 2,
        yStart: height / 2,
        orbitStepPx: Math.min(height, width) / ORBIT_STEP_PX_DIVIDER,
    };
}

function getAngle() {
    return ANGLES[Math.floor(ANGLES.length * Math.random())];
}

export default class Cosmo extends Component<Props, State> {
    static defaultProps = {
        objects: [],
        orbits: ORBITS,
    };

    constructor(props) {
        super(props);
        this.state = {
            ...getBound(),
            objectsCoordinates: {},
            isMeasured: false,
        };
        this.angles = {};
    }

    componentWillMount() {
        this.updateObjectsCoordinates(this.props.objects);
    }

    componentWillReceiveProps(nextProps) {
        this.updateObjectsCoordinates(nextProps.objects);
    }

    getCenterCoordinates = radius => {
        return {
            bottom: this.state.yStart - radius,
            left: this.state.xStart - radius,
        };
    };

    updateObjectsCoordinates = objects => {
        if (!objects.length || !this.state.width) {
            return;
        }

        const objectsCoordinates = {};
        objects.forEach(object => {
            const angle = this.angles[object.id] ? this.angles[object.id] : getAngle();
            this.angles[object.id] = angle;

            objectsCoordinates[object.id] = {
                ...object,
                xy: this.getOneObjectCoordinates(object.distance, angle),
                angle,
            };
        });

        this.setState({ objectsCoordinates });
    };

    getOneObjectCoordinates = (distance, angle) => {
        const localDistance = this.measureToPixel(distance);
        const coordinates = this.calculateCoordinates(localDistance, angle);
        const objectRadius = constants.minObjectRadius;

        return {
            bottom: this.state.yStart - objectRadius + coordinates.y,
            left: this.state.xStart - objectRadius + coordinates.x,
        };
    };

    isObjectCaptured = object => {
        const localDistance = this.measureToPixel(object.distance);
        return localDistance < constants.gravityRadius;
    };

    measureToPixel = distance => {
        // maps distance to device scale
        const maxLocalDistance = this.state.width / 2;
        return distance * maxLocalDistance / this.props.maxDistance;
    };

    pixelToMeasure = measure => {
        const maxLocalDistance = this.state.width / 2;
        return measure * this.props.maxDistance / maxLocalDistance;
    };

    calculateCoordinates = (radius, angle) => {
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return { x, y };
    };

    handlePlanetPress = debounce(object => {
        if (this.isObjectCaptured(object)) {
            this.props.onObjectCapture(object);
        }
    });

    measureRootView = event => {
        this.setState({
            ...getBound(event.nativeEvent.layout.height, event.nativeEvent.layout.width),
            isMeasured: true,
        });
    };

    render() {
        return (
            <View style={styles.container} onLayout={this.measureRootView}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
                {this.renderCenter()}
                {this.renderOrbits(this.props.orbits)}
                {this.renderObjects()}
            </View>
        );
    }

    renderCenter = () => {
        if (this.state.isMeasured) {
            return (
                <View
                    style={[
                        styles.planetWrapper,
                        this.getCenterCoordinates(constants.gravityRadius),
                    ]}
                >
                    <Image source={centerImage} style={styles.image} resizeMode={"contain"} />
                </View>
            );
        }
    };

    renderOrbits = orbits => {
        if (this.state.isMeasured) {
            const orbitComponents = [];

            for (let i = 1; i <= orbits; i++) {
                const radius = constants.gravityRadius + this.state.orbitStepPx * i;
                orbitComponents.push(this.renderOrbit(radius, i));
            }

            return <View>{orbitComponents}</View>;
        }
    };

    renderOrbit = (radius, key) => {
        return (
            <View
                key={key}
                style={[
                    styles.orbit,
                    { width: radius * 2, height: radius * 2, borderRadius: radius },
                    this.getCenterCoordinates(radius),
                ]}
            >
                <Text style={styles.orbitText}>
                    {Number.parseInt(this.pixelToMeasure(radius))} m
                </Text>
            </View>
        );
    };

    renderObjects = () => {
        if (this.state.isMeasured) {
            if (_.isEmpty(this.state.objectsCoordinates)) {
                return null;
            }

            return this.props.objects.map(object => {
                const nameColorStyle = this.isObjectCaptured(object) ? "black" : "gray";
                return (
                    <TouchableOpacity
                        onPress={() => {
                            this.handlePlanetPress(object);
                        }}
                        style={[styles.objectWrapper, this.state.objectsCoordinates[object.id].xy]}
                        activeOpacity={0.5}
                        key={object.id}
                    >
                        <Image
                            source={
                                object.type === STATION_TYPES.BAZAR ? objectImage : stationImage
                            }
                            style={styles.image}
                        />
                        <Text
                            style={[styles.objectName, { color: nameColorStyle }]}
                            numberOfLines={2}
                        >
                            {object.name ? object.name : object.id}
                        </Text>
                    </TouchableOpacity>
                );
            });
        }
    };
}
