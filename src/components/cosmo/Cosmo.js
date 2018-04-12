import React, { Component } from "react";
import { View, Image, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";

import _ from "lodash";

import styles from "./CosmoStyles";
import constants from "./Constants";

import backgroundImage from "./images/cosmo_bg2.jpg";
import centerImage from "./images/earth.png";
import objectImage from "./images/asteroid.png";

const ANGLES = [0, 0.8, 1.6, 2.4, 3, 3.6, 4.2, 4.8, 5.6];
const ORBITS = 4;
const ORBIT_STEP_PX = 30;
const TOP_OFFSET = 60;

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
};

export default class Cosmo extends Component<Props, State> {
    static defaultProps = {
        objects: [],
        orbits: ORBITS,
    };

    constructor() {
        super();

        const { width, height } = Dimensions.get("window");
        const xStart = width / 2;
        const yStart = (height - TOP_OFFSET) / 2;

        this.state = {
            xStart,
            yStart,
            width,
            height,
            objectsCoordinates: {},
        };
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
            const angle = this.angles[object.id] ? this.angles[object.id] : this.getAngle();
            this.angles[object.id] = angle;

            objectsCoordinates[object.id] = {
                ...object,
                xy: this.getOneObjectCoordinates(object.distance, angle),
                angle,
            };
        });

        this.setState({ objectsCoordinates });
    };

    getAngle = () => {
        return ANGLES[Math.floor(ANGLES.length * Math.random())];
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

    render() {
        return (
            <View style={styles.container}>
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

    handlePlanetPress = object => {
        if (this.isObjectCaptured(object)) {
            this.props.onObjectCapture(object);
        }
    };

    render() {
        return (
            <View style={styles.container}>
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
        return (
            <View
                style={[styles.planetWrapper, this.getCenterCoordinates(constants.gravityRadius)]}
            >
                <Image source={centerImage} style={styles.image} resizeMode={"contain"} />
            </View>
        );
    };

    renderOrbits = orbits => {
        const orbitComponents = [];

        for (let i = 1; i <= orbits; i++) {
            const radius = constants.gravityRadius + ORBIT_STEP_PX * i;
            orbitComponents.push(this.renderOrbit(radius, i));
        }

        return <View>{orbitComponents}</View>;
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
                <Text style={styles.orbitText}>{Number.parseInt(this.pixelToMeasure(radius))}</Text>
            </View>
        );
    };

    renderObjects = () => {
        if (_.isEmpty(this.state.objectsCoordinates)) {
            return null;
        }

        return this.props.objects.map(object => {
            return (
                <TouchableOpacity
                    onPress={this.handlePlanetPress.bind(this, object)}
                    style={[styles.objectWrapper, this.state.objectsCoordinates[object.id].xy]}
                    activeOpacity={0.5}
                    key={object.id}
                >
                    <Image source={objectImage} style={styles.image} />
                    <Text style={styles.objectName} numberOfLines={2}>
                        {object.name ? object.name : object.id}
                    </Text>
                </TouchableOpacity>
            );
        });
    };
}
