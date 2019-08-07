import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { styles } from '../routes/styles';

export default class MenuDrawer extends Component {
  navLink = (nav, text) => {
    <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>;
  };

  render() {
    return (
      // OBSOLETE
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.profileText}>
                <Text> Wolverine </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {this.navLink('home', 'home')}
            {this.navLink('search', 'search')}
          </View>
        </ScrollView>
      </View>
    );
  }
}
