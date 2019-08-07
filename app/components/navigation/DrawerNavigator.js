import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

import HomeContainer from 'components/home';
import SearchContainer from 'components/search';
import CounterContainer from 'components/counter';
import SessionContainer from 'components/auth/LoginForm';
import SignupContainer from 'components/auth/SignupForm';
import TodolistContainer from 'components/todolist';
import TabHeader from './TabHeader';
import SideBar from './SideBar';

const getNavigationConfig = title => ({
  navigationOptions: () => ({
    header: props => <TabHeader {...props} title={title} />
  })
});

// create navigator for movie page
const movieNav = createStackNavigator(
  {
    SessionContainer: { screen: SessionContainer },
    SignupContainer: { screen: SignupContainer },
    HomeContainer: {
      screen: HomeContainer,
      ...getNavigationConfig('Home')
    },
    CounterContainer: {
      screen: CounterContainer,
      ...getNavigationConfig('Counter')
    },
    SearchContainer: {
      screen: SearchContainer,
      ...getNavigationConfig('Search')
    },
    TodolistContainer: {
      screen: TodolistContainer,
      ...getNavigationConfig('To Do')
    }
  },
  getNavigationConfig()
);

// put main tab navigator in outmost app navigator
export const DrawerNavigator = createDrawerNavigator(
  {
    movieNav: { screen: movieNav }
  },
  {
    headerMode: 'screen',
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: 298,
    drawerPosition: 'left'
  }
);

export default createAppContainer(DrawerNavigator);
