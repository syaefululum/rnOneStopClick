import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { NavigationService } from '../navigation/NavigationService';

class Search extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.navigation.navigate('HomeContainer')} title="< Back to Home" />
        <Button onPress={this.props.navigation.navigate('CounterContainer')} title="Go to Redux Counter >" />
      </View>
    );
  }
}

const mapStateToProps = ({ routes }) => ({ routes });
export default connect(mapStateToProps)(Search);
