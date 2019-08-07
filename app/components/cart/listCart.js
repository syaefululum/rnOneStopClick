import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { listCartAPI, deleteCartAPI } from '../../api/api';
import { styles } from './styles';
import { Badge, Button, h3 } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import { setCart } from '../../actions/session/actions';

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      token: this.props.token,
      user: this.props.user
    };
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.state);
    // this.props.sessionCart(this.state.cart, this.state.user, this.state.token);
  }

  componentDidMount() {
    listCartAPI(this.state.token)
      .then(response => {
        this.props.sessionCart(response.data, this.state.user, this.state.token);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  deleteCart = cardId => {
    console.log('delete id', cardId);
    deleteCartAPI(cardId, this.state.token)
      .then(response => {
        if (response.code == 200) {
          console.log('delete success', response);
          var array = this.state.cart.filter(function(item) {
            return item.id !== cardId;
          });
          this.setState({
            cart: array
          });
          this.props.sessionCart(array, this.state.user, this.state.token);
          var data = [...this.state.cart];
          this.dropdown.alertWithType('success', 'Success', response.message);
        } else {
          this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
        }
      })
      .catch(error => {
        console.log('delete error', error);
        this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
      });
  };

  renderContent = data => {
    const { containerCart, containerImage, image, containerText, containerButton } = styles;
    data = Array.from(data);
    if (data.length === 0) {
      return <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>;
    }

    return data.map(item => {
      return (
        <View style={containerCart} key={item.id}>
          <View style={containerImage}>
            <Image
              style={image}
              resizeMode={'contain'}
              source={{ uri: 'https://goosc.herokuapp.com' + item.thumbnail }}
            />
          </View>
          <View style={containerText}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingBottom: 5 }}>{item.product_name}</Text>
            <NumberFormat
              value={item.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Badge
                  value={value}
                  status="primary"
                  containerStyle={{
                    width: '100%',
                    flexDirection: 'row'
                    // justifyContent: 'flex-end'
                  }}
                  textStyle={{ fontSize: 15, fontWeight: 'bold' }}
                  badgeStyle={{ borderRadius: 3 }}
                />
              )}
            />
          </View>
          <View style={containerButton}>
            <Button
              buttonStyle={{
                backgroundColor: 'red'
              }}
              icon={<Icon name="trash" size={15} color="white" />}
              iconRight
              onPress={this.deleteCart.bind(this, item.id)}
            />
          </View>
        </View>
      );
    });
  };

  render() {
    console.log('render list', this.state);
    const { safeAreaContainer, container, bottomView } = styles;
    this.state = {
      cart: this.props.cart,
      token: this.props.token,
      user: this.props.user
    };
    return (
      <SafeAreaView style={safeAreaContainer}>
        <View style={container}>
          <View style={{ width: '100%', backgroundColor: '#2c99ba', marginBottom: 7 }}>
            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Shopping Cart</Text>
          </View>
          <ScrollView>{this.renderContent(this.state.cart)}</ScrollView>
        </View>
        <Button
          title="Checkout"
          buttonStyle={{ width: '96%', marginLeft: 10, marginBottom: 5, marginRight: 10 }}
          onPress={() => this.props.navigation.navigate('SummaryCartContainer')}
        />
        {/* <View style={bottomView}> */}
        {/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total Price :</Text> */}
        {/* <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}> */}
        {/* <NumberFormat
              value={this.state.totalPrice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Badge
                  value={value}
                  status="primary"
                  textStyle={{ fontSize: 20, fontWeight: 'bold' }}
                  badgeStyle={{ borderRadius: 3, margin: 10 }}
                  wrapperStyle={{ padding: 10 }}
                />
              )}
            /> */}
        {/* <Button
            title="Checkout"
            buttonStyle={{ width: '100%' }}
            onPress={() => this.props.navigation.navigate('SummaryCartContainer')}
          /> */}
        {/* </View> */}
        {/* </View> */}
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </SafeAreaView>
    );
    //return <View style={container}>{this.renderContent(this.state.products)}</View>;
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
)(ListCart);
