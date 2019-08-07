import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Alert, RefreshControl } from 'react-native';
import { Container, Content, Fab, Icon, Button, View, Text, CardItem, Card, Toast, Root } from 'native-base';
import { BASE_URL } from '../../api/apiConst';
import { getAllProducts, deleteProductDetail } from '../../api/productAPI';
import { selectedProduct } from '../../actions/session/actions';
import NumberFormat from 'react-number-format';

class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      token: this.props.token,
      user: this.props.user,
      refresh: false,
      page: 0,
      limit: 10,
      maxPage: 0
    };
  }

  componentWillMount() {
    console.log('componentWillMount admin product');
    this.getProducts(this.state.token, this.state.page, this.state.limit);
  }

  componentWillUpdate() {
    console.log('will update component');
    //this.getProducts(this.state.token, this.state.page, this.state.limit);
  }

  getProducts = async (token, page, limit) => {
    try {
      await getAllProducts(token, page, limit)
        .then(resp => {
          console.log('componentWillMount admin product', resp);
          this.setState({
            products: [...resp.data.list, ...this.state.products],
            maxPage: (parseInt(resp.data.count) / parseInt(this.state.limit)).toFixed() + 1,
            refresh: false
          });
        })
        .catch(err => {
          console.log('getProducts err', err);
        });
    } catch (error) {
      console.log('getProducts catch error', error);
    }
  };

  handlingOnRefresh = () => {
    console.log('loading gan...');
    this.setState({
      refresh: true
    });
    if (this.state.page < this.state.maxPage) {
      this.getProducts(this.state.token, this.state.page + 1, this.state.limit);
      this.setState({
        page: this.state.page + 1
      });
    } else {
      console.log('page : false');
    }
  };

  handlingNewProduct = () => {
    this.props.navigation.navigate('NewProduct');
  };

  handlingEditProduct = productId => {
    this.props.navigation.navigate('UpdateProduct', { itemId: productId });
  };

  handlingDeleteProduct = productId => {
    Alert.alert('Delete Product', 'Are you sure to delete product ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel')
      },
      {
        text: 'OK',
        onPress: this.deleteProduct.bind(this, productId)
      }
    ]);
  };

  deleteProduct = productId => {
    deleteProductDetail(this.state.token, productId)
      .then(response => {
        console.log('deleteproduct response', response);
        //this.getProducts(this.state.token, this.state.page, this.state.limit);
        if (response.code == 200) {
          var array = this.state.products.filter(function(item) {
            return item.id !== productId;
          });
          this.setState({
            products: array
          });
        }
        Toast.show({
          text: response.message,
          buttonText: 'Okay',
          type: 'success',
          position: 'top',
          duration: 5000
        });
      })
      .catch(error => {
        console.log('deleteproduct error', error);
        Toast.show({
          text: error,
          buttonText: 'Okay',
          type: 'danger',
          position: 'top',
          duration: 5000
        });
      });
  };

  renderData = data => {
    data = Array.from(this.state.products);
    console.log('render data product dong', data);
    if (this.state.products.length == 0) {
      console.log('render data loading');
      return <Text>Loading </Text>;
    } else {
      return this.state.products.map(item => {
        return (
          <Card
            key={item.id}
            style={{
              width: '48%',
              marginLeft: 5,
              aspectRatio: 1,
              borderWidth: 1,
              borderColor: '#d6d7da',
              cardBorderRadius: 10
            }}
          >
            <CardItem
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%'
                }}
                source={{ uri: BASE_URL + '/static/images/' + item.thumbnail }}
              />
            </CardItem>
            <CardItem
              cardBody
              style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 5,
                paddingBottom: 5
              }}
            >
              <Text style={{ alignSelf: 'flex-start' }}>{item.name}</Text>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
                renderText={value => <Text style={{ alignSelf: 'flex-start', color: '#e36622' }}>{value}</Text>}
              />
              <View
                style={{
                  bottom: 0,
                  width: '99%',
                  flexDirection: 'row'
                }}
              >
                <Button
                  style={{ width: '49%', justifyContent: 'center', marginRight: 5 }}
                  onPress={this.handlingEditProduct.bind(this, item.id)}
                >
                  <Text style={{ alignSelf: 'center' }}>View</Text>
                </Button>

                <Button
                  danger
                  style={{ width: '49%', justifyContent: 'center' }}
                  onPress={this.handlingDeleteProduct.bind(this, item.id)}
                >
                  <Text style={{ alignSelf: 'center' }}>Delete</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        );
      });
    }
  };

  render() {
    return (
      <Root>
        <Container>
          <Content
            refreshControl={
              <RefreshControl refreshing={this.state.refresh} onRefresh={this.handlingOnRefresh.bind(this)} />
            }
          >
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {this.renderData(this.state.products)}
            </View>
          </Content>
          <View>
            <Fab
              active={true}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={this.handlingNewProduct.bind(this)}
            >
              <Icon name="add" />
            </Fab>
          </View>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = ({ sessionReducer }) => ({
  user: sessionReducer.user,
  token: sessionReducer.token,
  cart: sessionReducer.cart
});

const mapDispatchToProps = {
  setProduct: selectedProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProduct);
