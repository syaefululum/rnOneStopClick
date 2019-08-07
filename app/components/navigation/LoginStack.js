import { createStackNavigator } from 'react-navigation';
import LoginForm from '../auth/LoginForm/index';
import SignUpForm from '../auth/SignupForm/index';

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: () => ({
      title: '1StopClick',
      headerLeft: null,
      headerStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      }
    })
  },
  Signup: {
    screen: SignUpForm,
    navigationOptions: () => ({
      title: '1StopClick',
      headerLeft: null,
      headerStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      }
    })
  }
});

export default LoginStack;
