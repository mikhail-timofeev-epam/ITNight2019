import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Modal, ScrollView } from "react-native";

export default class PlanetDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stationDescription: props.stationDescription,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stationDescription: nextProps.stationDescription });
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={!!this.state.stationDescription}
                onRequestClose={this.handleCloseDescription}
            >
                <TouchableWithoutFeedback onPress={this.handleCloseDescription}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View
                            style={{
                                backgroundColor: "#212121",
                                marginHorizontal: 32,
                                marginVertical: 128,
                                borderRadius: 8,
                            }}
                        >
                            <ScrollView>
                                <TouchableWithoutFeedback>
                                    <View style={{ padding: 16 }}>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 20,
                                                alignSelf: "center",
                                            }}
                                        >
                                            {this.state.stationDescription}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    handleCloseDescription = () => {
        this.setState({ stationDescription: null });
    };
}
