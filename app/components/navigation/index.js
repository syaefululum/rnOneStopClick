import { Animated, Easing } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginStack from './LoginStack';
import DrawerStack from './DrawerStack';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

export const DrawerNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerStack }
  },
  {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'LoginStack',
    transitionConfig: noTransitionConfig
  }
);

export default createAppContainer(DrawerNavigator);
