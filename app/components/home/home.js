import React, { Component } from 'react';
import { Button, View, Image, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { restoreSession, selectedProduct, setCart } from '../../actions/session/actions';
import CardView from 'react-native-cardview';
import NumberFormat from 'react-number-format';
import { addCartAPI, getProducts, getDetailProduct, listCartAPI } from '../../api/api';
import DropdownAlert from 'react-native-dropdownalert';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: this.props.cart,
      token: this.props.token,
      user: this.props.user
    };
  }

  componentWillMount() {
    const { product, logged } = this.props;
    if (product == null) {
      getProducts(this.state.token)
        .then(response => {
          this.setState({ products: response.data });
        })
        .catch(error => {
          console.log('Error', error);
        });
    } else {
      if (logged == null) {
        this.props.navigation.navigate('Login');
      }
    }
  }

  componentDidUpdate() {
    console.log('this.props.navigation.navigate ProductDetailsContainer');
    if (this.props.product != null) {
      this.props.navigation.navigate('ProductDetailsContainer');
    }
  }

  getProductDetails = (productId, token) => {
    //console.log('getDetailProduct', productId + ' ' + token);
    getDetailProduct(productId, token)
      .then(response => {
        //console.log('getDetailProduct', response);
        if (response.code == 200) {
          this.props.setProduct(response.data, this.state.user, token, this.state.cart);
        }
      })
      .catch(error => {
        return error;
      });
  };

  handlingAddCart = (productId, token) => {
    addCartAPI(productId, token)
      .then(response => {
        if (response.code == 200 || response.code == 201) {
          listCartAPI(this.state.token)
            .then(response => {
              this.props.sessionCart(response.data, this.state.user, this.state.token);
            })
            .catch(error => {
              console.log('Error', error);
            });
          this.dropdown.alertWithType('success', 'Success', response.message);
        } else {
          this.dropdown.alertWithType('error', 'Error', response.message);
        }
      })
      .catch(error => {
        this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
      });
  };

  renderNestedData(data) {
    data = Array.from(data);
    maxlimit = 30;
    if (data.length === 0) {
      return <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>;
    }
    return data.map(item => {
      // console.log('home render', item);
      // console.log('https://goosc.herokuapp.com' + item.thumbnail);
      return (
        <CardView
          key={item.id}
          cardElevation={3}
          cardMaxElevation={2}
          cornerRadius={5}
          paddingBottom={10}
          style={{
            width: '48%',
            margin: '1%',
            aspectRatio: 1
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: '#d6d7da',
              flex: 1,
              width: '100%',
              height: '100%'
            }}
          >
            <Image
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#d6d7da'
              }}
              source={{ uri: 'https://goosc.herokuapp.com' + item.thumbnail }}
            />
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#d6d7da'
              }}
            >
              <Text>
                {item.name.length >= maxlimit
                  ? item.name
                      .substring(0, maxlimit - 3)
                      .substring(
                        0,
                        Math.min(
                          item.name.substring(0, maxlimit - 3).length,
                          item.name.substring(0, maxlimit - 3).lastIndexOf(' ')
                        )
                      ) + '...'
                  : item.name}
              </Text>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => <Text>{value}</Text>}
              />
            </View>
            <View
              style={{
                bottom: 0,
                width: '99%',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#d6d7da'
              }}
            >
              <View style={{ width: '48%', marginRight: '4%' }}>
                <Button title="View" onPress={this.getProductDetails.bind(this, item.id, this.state.token)} />
              </View>
              <View style={{ width: '48%' }}>
                <Button title="Add" onPress={this.handlingAddCart.bind(this, item.id, this.state.token)} />
              </View>
            </View>
          </View>
        </CardView>
      );
    });
  }

  render() {
    const { container, marginBox, title, subtitle, cardViewStyle, child, titleView, titleCard } = styles;
    return (
      <SafeAreaView style={styless.safeAreaView}>
        <View style={styless.container}>
          <ScrollView>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {this.renderNestedData(this.state.products)}
            </View>
          </ScrollView>
        </View>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </SafeAreaView>
    );
  }
}

const styless = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    margin: 10
  }
});

const mapStateToProps = ({ routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user,
  logged: sessionReducer.logged,
  product: sessionReducer.product,
  token: sessionReducer.token,
  cart: sessionReducer.cart
});

const mapDispatchToProps = {
  restore: restoreSession,
  setProduct: selectedProduct,
  sessionCart: setCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
