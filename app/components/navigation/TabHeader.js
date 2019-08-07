import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { Button, Left, Body, Right, Title, Header, View, Text } from 'native-base';
import { DrawerActions, NavigationActions } from 'react-navigation';

export default class TabHeader extends Component {
  render() {
    const props = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons color="white" size={20} name="menu" />
          </Button>
        </Left>
        {/* <Left>
          {props.navigation.state.index > 0 ? (
            <Button transparent onPress={() => props.navigation.dispatch(NavigationActions.back())}>
              <MaterialIcons color="white" size={20} name="arrow-back" />
            </Button>
          ) : (
            <Button transparent onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
              <MaterialIcons color="white" size={20} name="menu" />
            </Button>
          )}
        </Left> */}
        <Body style={{ height: 45, flexDirection: 'row', alignItems: 'center' }}>
          <Title>{this.props.title || '1StopClick'}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
