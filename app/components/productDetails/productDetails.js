import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { setCart } from '../../actions/session/actions';
import { ScrollView } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import VideoPlayer from 'react-native-video-controls';
import { BASE_URL } from '../../api/apiConst';
import { addCartAPI, listCartAPI } from '../../api/api';
import DropdownAlert from 'react-native-dropdownalert';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      token: this.props.token,
      user: this.props.user,
      product: this.props.product
    };
  }

  componentDidMount() {
    // console.log('productDetail componentDidMount', this.state);
    // console.log('productDetail componentDidMount', this.props);
    //this.getProductDetail();
  }

  // getProductDetail = () => {
  //   axios
  //     .get('https://goosc.herokuapp.com/guest/product/detail?id=' + this.props.product.id)
  //     .then(resp => {
  //       this.setState({ product: resp.data.data });
  //     })
  //     .catch(error => {
  //       return null;
  //     });
  // };

  handlingAddCart = (productId, token) => {
    addCartAPI(productId, token)
      .then(response => {
        if (response.code == 200 || response.code == 201) {
          listCartAPI(token)
            .then(resp => {
              this.props.sessionCart(resp.data, this.state.user, token);
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

  renderPreview = (preview, fileType, thumbnail) => {
    const { image } = styles;
    if (preview.Valid) {
      if (fileType == 'audio') {
        return <Image style={image} resizeMode={'contain'} source={{ uri: BASE_URL + thumbnail }} />;
      } else if ((fileType = 'video')) {
        return (
          <VideoPlayer
            style={image}
            showOnStart={true}
            paused={true}
            disableBack
            disableFullscreen
            disableVolume
            source={{ uri: BASE_URL + preview.String }}
          />
        );
      } else {
        return <Image style={image} resizeMode={'contain'} source={{ uri: BASE_URL + thumbnail }} />;
      }
    } else {
      return <Image style={image} resizeMode={'contain'} source={{ uri: BASE_URL + thumbnail }} />;
    }
  };

  renderContent = data => {
    const {
      container,
      imageContainer,
      image,
      detailContainer,
      productName,
      priceContainer,
      priceText,
      priceButton
    } = styles;
    if (data.length === 0) {
      return <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>;
    }
    return (
      <View style={container}>
        <View style={imageContainer}>{this.renderPreview(data.preview, data.preview_file_type, data.thumbnail)}</View>
        <View style={detailContainer}>
          <Text style={productName}>{data.name}</Text>
          <View style={priceContainer}>
            <View style={priceText}>
              <Text style={{ fontSize: 18 }}>Price : </Text>
              <NumberFormat
                value={this.state.product.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => <Text style={{ fontSize: 20 }}>{value}</Text>}
              />
            </View>
            <View style={priceButton}>
              <Button
                containerViewStyle={{ width: '100%' }}
                title="Add to cart"
                onPress={this.handlingAddCart.bind(this, data.id, this.state.token)}
              />
            </View>
          </View>
          <Text style={{ fontSize: 17 }}>Description : </Text>
          <Text style={{ fontSize: 18 }}>{data.description}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { safeCotainer } = styles;
    return (
      <SafeAreaView style={safeCotainer}>
        <ScrollView>{this.renderContent(this.state.product)}</ScrollView>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user,
  product: sessionReducer.product,
  cart: sessionReducer.cart,
  token: sessionReducer.token
});

const mapDispatchToProps = {
  sessionCart: setCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
