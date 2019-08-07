import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { RadioGroup } from 'react-native-btr';

export class BasicFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: 'admin@goosc.com', error: '' },
      password: { value: 'mitrais', error: '' }
    };
  }

  componentDidMount() {
    console.log('this.state signup componentDidMount', this.state);
    console.log('this.state signup componentDidMount', parseInt('0', 10));
  }

  handleButtonPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    isError = false;

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
      this.props.onButtonPress(this.state.email.value, this.state.password.value);
    }
  };

  render() {
    const { textInput, button, buttonTitle, errorStyle } = styles;
    return (
      <View>
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
