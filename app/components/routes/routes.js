import React, { Component } from 'react';
import { Provider } from 'react-redux';

import RootStackNav from '../navigation';
import NavigationService from '../navigation/NavigationService';

import configureStore from '../../store/index';
const store = configureStore();

export default class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStackNav ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
      </Provider>
    );
  }
}

// import React, { Component } from 'react';
// import { styles } from './styles';
// import { Scene, Router } from 'react-native-router-flux';
// import { connect, Provider } from 'react-redux';
// import { createAppContainer } from 'react-navigation';

// import DrawerNavigator from '../navigation/DrawerNavigator';
// import RootStack from '../navigation/index';
// import NavigationService from '../navigation/NavigationService';

// import HomeContainer from '../home/index';
// import SearchContainer from '../search/index';
// import CounterContainer from '../counter/index';
// import SessionContainer from '../auth/LoginForm/index';
// import SignupContainer from '../auth/SignupForm/index';
// import TodolistContainer from '../todolist/index';

// import configureStore from '../../store/index';

// const store = configureStore();
// const AppContainer = createAppContainer(RootStack);

// export default class Routes extends Component {
//   RouterRedux = DrawerNavigator;
//   render() {
//     return (
//       <Provider store={store}>
//         <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
//       </Provider>
//       // <Provider store={store}>
//       //   <RouterRedux navigationBarStyle={styles.navBar} tintColor="#ffffff" titleStyle={styles.barButtonTextStyle}>
//       //     <Scene key="root">
//       //       <Scene key="login" component={SessionContainer} title="Login" initial={true} />
//       //       <Scene key="signup" component={SignupContainer} title="Signup" />
//       //       <Scene key="home" component={HomeContainer} title="Home" />
//       //       <Scene key="search" component={SearchContainer} title="Search" />
//       //       <Scene key="counter" component={CounterContainer} title="Counter" />
//       //       <Scene key="todolist" component={TodolistContainer} title="To-Do List" />
//       //     </Scene>
//       //   </RouterRedux>
//       // </Provider>
//     );
//   }
// }
