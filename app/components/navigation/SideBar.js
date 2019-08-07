import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session/actions';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Footer,
  FooterTab,
  Button,
  Thumbnail,
  Icon,
  Left,
  Right,
  Badge
} from 'native-base';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      cart: this.props.cart
    };
  }
  componentDidMount() {
    // console.log('this.props componentDidMount', this.state.cart);
    // console.log('this.props componentDidMount', this.props.cart);
  }

  componentDidUpdate() {
    //console.log('SIDEBAR componentDidUpdate', this.props.cart);
  }

  componentWillUpdate() {
    // console.log('SIDEBAR componentWillUpdate', this.state.cart);
    // console.log('SIDEBAR componentWillUpdate', this.props.cart);
  }

  logout = () => {
    this.props.logout();
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 100);
  };

  render() {
    this.state = {
      user: this.props.user,
      cart: this.props.cart
    };
    return (
      <Container>
        <Content>
          <View style={{ height: 150, padding: 20, borderBottomWidth: 1, backgroundColor: '#a0bbe8' }}>
            <Thumbnail
              style={{ marginBottom: 20 }}
              source={{ uri: 'https://eastonialeopards.com/wp-content/uploads/2017/04/movie-article.jpg' }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {this.state.user.firstname + ' ' + this.state.user.lastname}
            </Text>
            <Text>{this.state.user.email}</Text>
          </View>
          <List>
            {this.state.user.role_id == 3 ? (
              <ListItem button onPress={() => this.props.navigation.navigate('HomeContainer')}>
                <Left>
                  <Icon name="home" style={{ marginRight: 10, color: 'blue' }} />
                  <Text>Home</Text>
                </Left>
              </ListItem>
            ) : null}

            {this.state.user.role_id == 3 ? (
              <ListItem button onPress={() => this.props.navigation.navigate('ProfileContainer')}>
                <Left>
                  <Icon name="person" style={{ marginRight: 10, color: 'purple' }} />
                  <Text>Profile</Text>
                </Left>
              </ListItem>
            ) : null}

            {this.state.user.role_id == 3 ? (
              <ListItem button onPress={() => this.props.navigation.navigate('ListCartContainer')}>
                <Left>
                  <Icon name="cart" style={{ marginRight: 10, color: 'green' }} />
                  <Text>Cart</Text>
                </Left>
                <Right>
                  <Badge success>
                    <Text>{this.state.cart.length}</Text>
                  </Badge>
                </Right>
              </ListItem>
            ) : null}

            {this.state.user.role_id == 1 ? (
              <ListItem button onPress={() => this.props.navigation.navigate('AdminProduct')}>
                <Left>
                  <Icon name="settings" style={{ marginRight: 10 }} />
                  <Text>Admin Product</Text>
                </Left>
              </ListItem>
            ) : null}

            {this.state.user.role_id == 1 ? (
              <ListItem button onPress={() => this.props.navigation.navigate('AdminCategory')}>
                <Left>
                  <Icon name="settings" style={{ marginRight: 10 }} />
                  <Text>Admin Category</Text>
                </Left>
              </ListItem>
            ) : null}
          </List>
        </Content>
        <Footer>
          <FooterTab button style={{ backgroundColor: '#c4d3d2', paddingTop: 15, paddingLeft: 20 }}>
            <Icon onPress={() => this.logout()} name="exit" style={{ color: 'red' }} />
            {/* <Text style={{ left: 0 }}>Logout</Text> */}
            {/* <Button onPress={() => this.logout()}>
              <Text>Logout</Text>
            </Button> */}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer, logged }) => ({
  routes: routes,
  user: sessionReducer.user,
  logged: logged,
  cart: sessionReducer.cart
});

const mapDispatchToProps = {
  logout: logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
