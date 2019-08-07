import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { styles } from './styles';

export class BasicFormComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      firstName: { value: '', error: '' },
      lastName: { value: '', error: '' }
    };
  }

  componentDidMount() {
    console.log('this.state signup', this.state);
  }

  handleButtonPress = () => {
    console.log('handleButtonPress', this.state);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    isError = false;

    if (this.state.firstName.value == '') {
      this.setState({
        firstName: {
          value: this.state.firstName.value,
          error: 'First Name is required'
        }
      });
      isError = true;
    }

    if (this.state.lastName.value == '') {
      this.setState({
        lastName: {
          value: this.state.lastName.value,
          error: 'Last Name is required'
        }
      });
      isError = true;
    }

    if (this.state.email.value == '') {
      this.setState({
        email: {
          value: this.state.email.value,
          error: 'Email is required'
        }
      });
      isError = true;
    } else {
      if (reg.test(this.state.email.value) === false) {
        isError = true;
        this.setState({
          email: {
            value: this.state.email.value,
            error: 'The Email address is badly formatted'
          }
        });
      }
    }

    if (this.state.password.value == '') {
      this.setState({
        password: {
          value: this.state.password.value,
          error: 'Password is required'
        }
      });
      isError = true;
    }

    if (!isError) {
      this.props.onButtonPress(
        this.state.email.value,
        this.state.password.value,
        this.state.firstName.value,
        this.state.lastName.value
      );
      //Alert.alert('', 'File download successfully', [{ text: 'OK' }], { cancelable: false });
    }
  };

  render() {
    const { textInput, button, buttonTitle, errorStyle } = styles;
    return (
      <View>
        <TextInput
          style={textInput}
          placeholder="First name"
          returnKeyType="next"
          keyboardType="default"
          autoCapitalize="words"
          onChangeText={text =>
            this.setState({
              firstName: {
                value: text,
                error: ''
              }
            })
          }
          value={this.state.firstName.value}
          underlineColorAndroid={'transparent'}
        />
        {!!this.state.firstName.error && <Text style={errorStyle}>{this.state.firstName.error}</Text>}

        <TextInput
          style={textInput}
          placeholder="Last name"
          returnKeyType="next"
          keyboardType="default"
          autoCapitalize="words"
          onChangeText={text =>
            this.setState({
              lastName: {
                value: text,
                error: ''
              }
            })
          }
          value={this.state.lastName.value}
          underlineColorAndroid={'transparent'}
        />
        {!!this.state.lastName.error && <Text style={errorStyle}>{this.state.lastName.error}</Text>}

        {/* <TextInput
          style={textInput}
          placeholder="Phone Number"
          returnKeyType="next"
          keyboardType="phone-pad"
          autoCapitalize="none"
          onChangeText={this.handleInputChange}
          value={phone}
          underlineColorAndroid={'transparent'}
        />
        {!!this.state.phoneError && <Text style={errorStyle}>{this.state.phoneError}</Text>} */}

        <TextInput
          style={textInput}
          placeholder="Email"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text =>
            this.setState({
              email: {
                value: text,
                error: ''
              }
            })
          }
          value={this.state.email.value}
          underlineColorAndroid={'transparent'}
        />
        {!!this.state.email.error && <Text style={errorStyle}>{this.state.email.error}</Text>}

        <TextInput
          style={textInput}
          placeholder="Password"
          secureTextEntry={true}
          returnKeyType="done"
          onChangeText={text =>
            this.setState({
              password: {
                value: text,
                error: ''
              }
            })
          }
          value={this.state.password.value}
          underlineColorAndroid={'transparent'}
        />
        {!!this.state.password.error && <Text style={errorStyle}>{this.state.password.error}</Text>}

        <TouchableOpacity style={button} onPress={this.handleButtonPress}>
          <Text style={buttonTitle}>{this.props.buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
