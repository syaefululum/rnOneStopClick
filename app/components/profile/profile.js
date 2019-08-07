import React, { Component } from 'react';
import { Container, Thumbnail, Content, Text, ListItem, Button, Item, Input, Label, Icon, Right } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './style';
import { setCart } from '../../actions/session/actions';
import { getUserProfile, updateUserProfile, changeUserPassword } from '../../api/profileAPI';
import DropdownAlert from 'react-native-dropdownalert';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      token: this.props.token,
      user: {
        user_id: this.props.user.id,
        user_email: this.props.user.email,
        first_name: this.props.user.firstname,
        last_name: this.props.user.lastname,
        user_balance: 0,
        join_date: this.props.user.updated_at.Time
      },
      isEdit: false,
      isEditPassword: false,
      firstNameError: {
        error: false,
        message: ''
      },
      lastNameError: {
        error: false,
        message: ''
      },
      emailError: {
        error: false,
        message: ''
      },
      oldPasswordError: {
        error: false,
        message: '',
        value: ''
      },
      newPasswordError: {
        error: false,
        message: '',
        value: ''
      }
    };
  }

  componentDidMount() {
    console.log('componentDidMount', this.state);
    getUserProfile(this.state.token)
      .then(resp => {
        console.log('getUserProfile', resp);
        this.setState({ user: resp.data[0] });
      })
      .catch(err => {
        console.log('Error', err);
        this.dropdown.alertWithType('error', 'Error', err);
      });
  }

  handlingEditButton = () => {
    this.setState({
      isEdit: true,
      firstNameError: {
        error: false,
        message: ''
      },
      lastNameError: {
        error: false,
        message: ''
      },
      emailError: {
        error: false,
        message: ''
      }
    });
  };

  handlingEditPassword = () => {
    this.setState({
      isEditPassword: true,
      oldPasswordError: {
        error: false,
        message: '',
        value: ''
      },
      newPasswordError: {
        error: false,
        message: '',
        value: ''
      }
    });
  };

  handlingCancelButton = () => {
    console.log('handlingCancelButton', this.props);
    this.setState({
      user: {
        user_id: this.props.user.id,
        user_email: this.props.user.email,
        first_name: this.props.user.firstname,
        last_name: this.props.user.lastname,
        user_balance: this.state.user.user_balance,
        join_date: this.props.user.updated_at.Time
      },
      isEdit: false
    });
  };

  handlingCancelPassword = () => {
    this.setState({
      isEditPassword: false
    });
  };

  resetStatus = () => {
    this.setState({
      isEdit: false
    });
  };

  handleUpdatePassword = () => {
    isError = false;

    if (this.state.oldPasswordError.value == '') {
      this.setState({
        oldPasswordError: {
          error: true,
          message: 'Old password is required',
          value: this.state.oldPasswordError.value
        }
      });
      isError = true;
    }

    if (this.state.newPasswordError.value == '') {
      this.setState({
        newPasswordError: {
          error: true,
          message: 'New password is required',
          value: this.state.newPasswordError.value
        }
      });
      isError = true;
    }

    if (!isError) {
      changeUserPassword(
        this.state.token,
        this.state.user.user_email,
        this.state.oldPasswordError.value,
        this.state.newPasswordError.value
      )
        .then(resp => {
          console.log('changeUserPassword', resp);
          this.resetStatusPassword();
          this.dropdown.alertWithType('success', 'Success', resp.message);
        })
        .catch(err => {
          console.log('changeUserPassword err', err);
          this.dropdown.alertWithType('error', 'Error', err);
        });
    }
  };

  resetStatusPassword = () => {
    this.setState({
      isEditPassword: false
    });
  };

  handleUpdateButton = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    isError = false;

    if (this.state.user.first_name == '') {
      this.setState({
        firstNameError: {
          error: true,
          message: 'First name is required'
        }
      });
      isError = true;
    }

    if (this.state.user.last_name == '') {
      this.setState({
        lastNameError: {
          error: true,
          message: 'Last name is required'
        }
      });
      isError = true;
    }

    if (this.state.user.user_email == '') {
      this.setState({
        lastNameError: {
          error: true,
          message: 'Email is required'
        }
      });
      isError = true;
    } else {
      if (reg.test(this.state.user.user_email) === false) {
        this.setState({
          emailError: {
            error: true,
            message: 'The Email address is badly formatted'
          }
        });
        isError = true;
      }
    }

    if (!isError) {
      updateUserProfile(
        this.state.token,
        this.state.user.user_id,
        this.state.user.user_email,
        this.state.user.first_name,
        this.state.user.last_name,
        this.props.user.role_id
      )
        .then(resp => {
          console.log('updateUserProfile resp', resp);
          this.setState({
            user: {
              user_id: resp.data.id,
              user_email: resp.data.email,
              first_name: resp.data.firstname,
              last_name: resp.data.lastname,
              user_balance: this.state.user.user_balance,
              join_date: resp.data.updated_at.Time
            }
          });
          this.props.user.email = this.state.user.user_email;
          this.props.user.firstname = this.state.user.first_name;
          this.props.user.lastname = this.state.user.last_name;
          this.resetStatus();
          this.dropdown.alertWithType('success', 'Success', resp.message);
        })
        .catch(err => {
          console.log('updateUserProfile err', err);
          this.dropdown.alertWithType('error', 'Error', err.message);
        });
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
            <View
              style={{
                flex: 2,
                backgroundColor: 'powderblue',
                height: 175,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Thumbnail
                large
                style={{ marginBottom: 20, alignItems: 'center' }}
                source={{ uri: 'https://eastonialeopards.com/wp-content/uploads/2017/04/movie-article.jpg' }}
                // <Icon />
              />
              <Text style={{ textAlign: 'center' }}>{this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
            </View>
            <View>
              <ListItem itemDivider>
                <Text style={{ flex: 1 }}>Profile</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  {this.state.isEdit ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Button bordered dark style={{ marginRight: 3 }} onPress={this.handlingCancelButton.bind(this)}>
                        <Text>Cancel</Text>
                      </Button>
                      <Button bordered dark onPress={this.handleUpdateButton.bind(this)}>
                        <Text>Save</Text>
                      </Button>
                    </View>
                  ) : (
                    <Button bordered dark onPress={this.handlingEditButton.bind(this)}>
                      <Text>Edit</Text>
                    </Button>
                  )}
                </View>
              </ListItem>
              <ListItem style={{ flexDirection: 'column' }}>
                <Item stackedLabel style={{ flexDirection: 'column', width: '100%' }}>
                  <Label>First Name</Label>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Input
                      disabled={!this.state.isEdit}
                      value={this.state.user.first_name}
                      onChangeText={text =>
                        this.setState({
                          user: {
                            user_id: this.state.user.user_id,
                            user_email: this.state.user.user_email,
                            first_name: text,
                            last_name: this.state.user.last_name,
                            user_balance: this.state.user.user_balance,
                            join_date: this.state.user.join_date
                          },
                          firstNameError: {
                            error: false,
                            message: ''
                          }
                        })
                      }
                    />
                    {this.state.firstNameError.error ? (
                      <Right>
                        <Icon active name="information-circle" style={{ color: 'red' }} />
                      </Right>
                    ) : null}
                  </View>
                </Item>
                <Item stackedLabel style={{ flexDirection: 'column', width: '100%' }}>
                  <Label>Last Name</Label>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Input
                      disabled={!this.state.isEdit}
                      value={this.state.user.last_name}
                      onChangeText={text =>
                        this.setState({
                          user: {
                            user_id: this.state.user.user_id,
                            user_email: this.state.user.user_email,
                            first_name: this.state.user.first_name,
                            last_name: text,
                            user_balance: this.state.user.user_balance,
                            join_date: this.state.user.join_date
                          },
                          lastNameError: {
                            error: false,
                            message: ''
                          }
                        })
                      }
                    />
                    {this.state.lastNameError.error ? (
                      <Right>
                        <Icon active name="information-circle" style={{ color: 'red' }} />
                      </Right>
                    ) : null}
                  </View>
                </Item>
                <Item stackedLabel last style={{ flexDirection: 'column', width: '100%' }}>
                  <Label>Email</Label>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Input
                      disabled={!this.state.isEdit}
                      value={this.state.user.user_email}
                      onChangeText={text =>
                        this.setState({
                          user: {
                            user_id: this.state.user.user_id,
                            user_email: text,
                            first_name: this.state.user.first_name,
                            last_name: this.state.user.last_name,
                            user_balance: this.state.user.user_balance,
                            join_date: this.state.user.join_date
                          },
                          emailError: {
                            error: false,
                            message: ''
                          }
                        })
                      }
                    />
                    {this.state.emailError.error ? (
                      <Right>
                        <Icon active name="information-circle" style={{ color: 'red' }} />
                      </Right>
                    ) : null}
                  </View>
                </Item>
              </ListItem>
              <ListItem last>
                <Text>Balance</Text>
                <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                  <Text>Rp{this.state.user.user_balance}</Text>
                </View>
              </ListItem>
              <ListItem itemDivider last>
                <Text style={{ flex: 1 }}>Change Password</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  {this.state.isEditPassword ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Button bordered dark style={{ marginRight: 3 }} onPress={this.handlingCancelPassword.bind(this)}>
                        <Text>Cancel</Text>
                      </Button>
                      <Button bordered dark onPress={this.handleUpdatePassword.bind(this)}>
                        <Text>Save</Text>
                      </Button>
                    </View>
                  ) : (
                    <Button bordered dark onPress={this.handlingEditPassword.bind(this)}>
                      <Text>Edit</Text>
                    </Button>
                  )}
                </View>
              </ListItem>
              {this.state.isEditPassword ? (
                <ListItem style={{ flexDirection: 'column' }}>
                  <Item stackedLabel style={{ flexDirection: 'column', width: '100%' }}>
                    <Label>Old Password</Label>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <Input
                        secureTextEntry={true}
                        value={this.state.oldPasswordError.value}
                        onChangeText={text =>
                          this.setState({
                            oldPasswordError: {
                              value: text,
                              error: false,
                              message: ''
                            }
                          })
                        }
                      />
                      {this.state.oldPasswordError.error ? (
                        <Right>
                          <Icon active name="information-circle" style={{ color: 'red' }} />
                        </Right>
                      ) : null}
                    </View>
                  </Item>
                  <Item stackedLabel style={{ flexDirection: 'column', width: '100%' }}>
                    <Label>New Password</Label>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <Input
                        secureTextEntry={true}
                        value={this.state.newPasswordError.value}
                        onChangeText={text =>
                          this.setState({
                            newPasswordError: {
                              value: text,
                              error: false,
                              message: ''
                            }
                          })
                        }
                      />
                      {this.state.newPasswordError.error ? (
                        <Right>
                          <Icon active name="information-circle" style={{ color: 'red' }} />
                        </Right>
                      ) : null}
                    </View>
                  </Item>
                </ListItem>
              ) : null}
            </View>
          </View>
        </Content>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user,
  logged: sessionReducer.logged,
  token: sessionReducer.token,
  cart: sessionReducer.cart
});

const mapDispatchToProps = {
  sessionCart: setCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
