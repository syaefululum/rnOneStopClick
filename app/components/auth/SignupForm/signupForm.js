import React, { Component } from 'react';
import { View, Alert, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/BasicSignUpForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signupUser, setDefault } from '../../../actions/session/actions';

class SignupFormComponent extends Component {
  componentDidUpdate() {
    const { error, loading } = this.props;
    console.log('SignupFormComponent', this.props);
    // if (!loading || error == null) {
    //   this.props.navigation.navigate('Login');
    // }
  }
  handleSignIn = () => {
    this.props.sessDefault();
    this.props.navigation.navigate('Login');
  };
  render() {
    const { signup, loading, error, message } = this.props;
    const {
      scrollView,
      imageBox,
      loginBox,
      textTitle,
      generalError,
      generalSuccess,
      generalText,
      button,
      buttonTitle
    } = styles;
    return (
      <KeyboardAwareScrollView style={scrollView}>
        <View style={imageBox}>
          <Text style={textTitle}>Sign Up</Text>
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
            <View>
              <BasicFormComponent buttonTitle={'Signup'} onButtonPress={signup} />
              <TouchableHighlight
                style={{
                  alignItems: 'center',
                  padding: 10,
                  marginTop: 5
                }}
                onPress={this.handleSignIn.bind(this)}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}> Signin </Text>
              </TouchableHighlight>
              {/* <BasicFormComponent buttonTitle={'signup'} onButtonPress={signup} />
              <TouchableOpacity style={button} onPress={this.handleSignIn.bind(this)}>
                <Text style={buttonTitle}>SignIn</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { loading, error, message } }) => ({
  routes: routes,
  loading: loading,
  error: error,
  message: message
});

const mapDispatchToProps = {
  signup: signupUser,
  sessDefault: setDefault
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupFormComponent);
