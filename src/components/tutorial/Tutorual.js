import React, { Component } from "react";
import { View, Image, Text, ImageBackground, TouchableOpacity } from "react-native";

import _ from "lodash";

import styles from "./TutorialStyles";

import backgroundImage from "./../cosmo/images/cosmo_bg.jpg";
import centerImage from "./../cosmo/images/earth.png";
import objectImage from "./../cosmo/images/asteroid.png";
import stationImage from "./../cosmo/images/satelite.png";

export default class Tutorual extends Component<> {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.top}>
          <Text style={styles.text} numberOfLines={2}>⇖{"\n"} Ваше Имя</Text>
          <Text style={styles.text} numberOfLines={2}>⇑{"\n"} Очки</Text>
          <Text style={styles.text} numberOfLines={2}>⇗{"\n"} Кнопка Dashboard </Text>
        </View>
        <View style={styles.middle}>
          <Image style={styles.objectWrapper} source={centerImage} />
          <Text style={styles.text} numberOfLines={6}>Земля - Ваше устройство.</Text>
        </View>
        <View style={styles.middle}>
          <Image style={styles.objectWrapper} source={objectImage} />
          <Text style={styles.text} numberOfLines={6}>Когда астероид касается земли, нажмите на него, чтобы
            попасть на квест</Text>
        </View>
        <View style={styles.middle}>
          <Image style={styles.objectWrapper} source={stationImage} />
          <Text style={styles.text} numberOfLines={10}>Спутники - просто метки физических станций. Ищите их, там
            вы можете заработать дополнительные баллы. Нажимать на них необязательно</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text>Я ВСЕ ПОНЯЛ!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
