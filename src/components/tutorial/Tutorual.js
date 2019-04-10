import React, { Component } from "react";
import { View, Image, Text, ImageBackground, TouchableOpacity } from "react-native";

import _ from "lodash";

import styles from "./TutorialStyles";

import backgroundImage from "./../cosmo/images/desert_bg.jpg";
import centerImage from "./../cosmo/images/you.png";
import objectImage from "./../cosmo/images/bazaar.png";
import stationImage from "./../cosmo/images/korovan.png";

export default class Tutorual extends Component<> {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
                <View style={styles.middle}>
                    <Text style={[styles.text, {fontSize: 18}]} numberOfLines={6}>
                        Туториал
                    </Text>
                </View>
                {/* <View style={styles.top}>
                    <Text style={[styles.text, { flex: 2 }]} numberOfLines={2}>
                        {"\n"} Идентификатор / Имя
                    </Text>
                    <Text style={[styles.text, { flex: -1 }]} numberOfLines={2}>
                        {"\n"} Топ 10{" "}
                    </Text>
                </View> */}
                <View style={styles.middle}>
                    <Image style={styles.objectWrapper} source={centerImage} />
                    <Text style={styles.text} numberOfLines={6}>
                        Это ты!
                    </Text>
                </View>
                <View style={styles.middle}>
                    <Image style={styles.objectWrapper} source={stationImage} />
                    <Text style={styles.text} numberOfLines={10}>
                        Это корован. Нажми на него чтобы получить инвентарь.
                        Но берегись, иногда за корованом скрываются разбойники, которые отберут весь твой награбленный инвентарь! ;)
                    </Text>
                </View>
                <View style={styles.middle}>
                    <Image style={styles.objectWrapper} source={objectImage} />
                    <Text style={styles.text} numberOfLines={6}>
                        Это базар. Здесь ты можешь сдать всё награбленное!
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text>Я ВСЕ ПОНЯЛ!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
