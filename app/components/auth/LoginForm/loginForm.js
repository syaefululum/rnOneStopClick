import React, { Component } from 'react';
import { View, Image, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginUser, restoreSession, loginGoogle, setDefault } from '../../../actions/session/actions';
import { GoogleSigninButton } from 'react-native-google-signin';

const FIREBASE_LOGO = require('../../../../assets/icons/firebase.png');
const REACTNATIVE_LOGO = require('../../../../assets/icons/react.png');

class LoginFormComponent extends Component {
  componentWillMount() {
    console.log('componentWillMount', this.props);
  }
  componentDidUpdate() {
    const { logged, registered, user } = this.props;
    console.log('this.props;', this.props);
    if (logged) {
      if (user.role_id == 1) {
        this.props.navigation.navigate('AdminProduct');
      } else if (user.role_id == 3) {
        this.props.navigation.navigate('HomeContainer');
      } else {
        this.props.navigation.navigate('HomeContainer');
      }
    }

    if (registered) this.props.navigation.navigate('Signup');
    //if (!prevProps.error && error) Alert.alert('error', error);
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    const { login, loading, loginG, error, message, logged, registered } = this.props;
    const {
      scrollView,
      imageBox,
      image,
      loginBox,
      socialButtonStyle,
      generalError,
      generalSuccess,
      generalText
    } = styles;
    return (
      <KeyboardAwareScrollView style={scrollView}>
        <View style={imageBox}>
          <Image style={image} source={REACTNATIVE_LOGO} />
        </View>
        {error ? (
          <View style={generalError}>
            <Text style={generalText}>{error}</Text>
          </View>
        ) : null}

        {message ? (
          <View style={generalSuccess}>
            <Text style={generalText}>{message}</Text>
          </View>
        ) : null}
        <View style={loginBox}>
          {loading ? (
            <LoadingIndicator color="#ffffff" size="large" />
          ) : (
            <BasicFormComponent buttonTitle={'login'} onButtonPress={login} />
          )}
        </View>
        <View style={socialButtonStyle}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={loginG}
            //disabled={this.state.isSigninInProgress}
          />
        </View>
        <View>
          {loading ? null : (
            <Button
              onPress={() => {
                this.props.error = '';
                this.props.sessDefault();
                this.props.navigation.navigate('Signup');
              }}
              title="Signup"
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({
  routes,
  sessionReducer: { restoring, loading, user, error, logged, token, message, cart, registered }
}) => ({
  routes: routes,
  restoring: restoring,
  loading: loading,
  user: user,
  error: error,
  logged: logged,
  token: token,
  message: message,
  cart: cart,
  registered: registered
});

const mapDispatchToProps = {
  login: loginUser,
  restore: restoreSession,
  loginG: loginGoogle,
  sessDefault: setDefault
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
