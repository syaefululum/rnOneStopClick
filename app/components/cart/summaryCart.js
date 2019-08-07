import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { summaryCartAPI, doPayment, downloadValidation, downloadFile } from '../../api/api';
import { BASE_URL, DOWNLOADFILE_URL } from '../../api/apiConst';
import { summaryStyle } from './summaryStyle';
import { Badge, Button } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { Picker } from 'native-base';
import PayPal from 'react-native-paypal-wrapper';
import DropdownAlert from 'react-native-dropdownalert';
import RNFetchBlob from 'rn-fetch-blob';

class SummaryCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryCart: [],
      productCart: [],
      paymentMethod: 'paypal',
      downloadSuccess: false,
      token: this.props.token
    };
    this.state.summaryCart.currency = '';
  }
  componentDidUpdate() {}
  componentDidMount() {
    console.log('componentDidMount summarycart', this.props);
    summaryCartAPI('', this.state.paymentMethod, this.state.token)
      .then(response => {
        console.log(response);
        this.setState({ summaryCart: response.data, productCart: response.data.product_list });
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  paymentWithPaypal = (price, currency) => {
    console.log('paymentWithPaypal', price);
    PayPal.initialize(
      PayPal.NO_NETWORK,
      'AfZFgHl81YUjuiztSHmereuUBPwfUNT1f9r10DhQkvXa8vfekJ39j8ON7oTl4FKp1qIfItx9veWy-_2x'
    );
    PayPal.pay({
      price: String(price),
      currency: currency,
      description: 'Your description goes here'
    })
      .then(confirm => {
        if (confirm.response.state == 'approved') {
          doPayment(this.state.summaryCart, this.state.token)
            .then(response => {
              console.log('savePayment', response);
              if (response.status == 200) {
                this.setState({ downloadSuccess: true });
                this.dropdown.alertWithType('success', 'Success', response.message);
              } else {
                this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
              }
            })
            .catch(error => {
              this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
            });
        } else {
          this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
        }
      })
      .catch(error => {
        this.dropdown.alertWithType('error', 'Error', 'Something went wrong, please try again');
      });
  };

  savePayment = (paymentData, token) => {
    doPayment(paymentData, token)
      .then(resp => {
        if (resp.code == 200) {
          return resp.data;
        } else {
          return resp.message;
        }
      })
      .catch(error => {
        return error;
      });
  };

  requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storate');
      } else {
        console.log('Storage permission denied');
        Alert.alert('', 'Permission denied', [{ text: 'OK' }], { cancelable: false });
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('', 'Permission request failed', [{ text: 'OK' }], { cancelable: false });
    }
  };

  downloadProduct = (productId, token) => {
    console.log('downloadProduct', productId + ' ' + token);
    this.requestStoragePermission();
    downloadValidation(productId, token)
      .then(response => {
        console.log('downloadValidation', response);
        if (response.success) {
          RNFetchBlob.config({
            notification: true,
            useDownloadManager: true,
            path: RNFetchBlob.fs.dirs.DownloadDir + '/' + response.filename + '.' + response.extension
          })
            .fetch('GET', BASE_URL + DOWNLOADFILE_URL + '?productid=' + productId, {
              Authorization: 'Bearer ' + token
            })
            .then(res => {
              console.log('RNFetchBlob', res);
              Alert.alert(
                '',
                'File download successfully',
                // [{ text: 'OK', onPress: () => this.props.navigation.navigate('HomeContainer') }],
                [{ text: 'OK' }],
                { cancelable: false }
              );
            });
        }
      })
      .catch();
  };

  renderContent = (data, currency) => {
    const { containerCart, containerImage, image, containerText, containerButton } = summaryStyle;
    console.log('renderData', data);
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
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={currency}
                renderText={value => (
                  <Badge
                    value={value}
                    status="primary"
                    containerStyle={{
                      width: '50%',
                      flexDirection: 'row'
                      //justifyContent: 'flex-end'
                    }}
                    textStyle={{ fontSize: 15, fontWeight: 'bold' }}
                    badgeStyle={{ borderRadius: 3 }}
                  />
                )}
              />
              {this.state.downloadSuccess && (
                <Button
                  containerStyle={{ marginLeft: 'auto' }}
                  title="Download"
                  onPress={this.downloadProduct.bind(this, item.product_id, this.state.token)}
                />
              )}
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    const { safeAreaContainer, container, bottomView } = summaryStyle;
    return (
      <SafeAreaView style={safeAreaContainer}>
        <View style={container}>
          <View style={{ flex: 2 }}>
            <View style={{ width: '100%', backgroundColor: '#2c99ba' }}>
              <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Summary Cart</Text>
            </View>
            <ScrollView>{this.renderContent(this.state.productCart, this.state.summaryCart.currency)}</ScrollView>
          </View>
          {!this.state.downloadSuccess && (
            <View style={{ flex: 1 }}>
              <View style={{ width: '100%', backgroundColor: '#2c99ba' }}>
                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Detail Payment</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '65%', justifyContent: 'center' }}>
                  <Text>Payment Method</Text>
                </View>
                <View style={{ width: '35%', justifyContent: 'center' }}>
                  <Picker selectedValue={this.state.paymentMethod}>
                    <Picker.Item label="OSC Balance" value="balance" />
                    <Picker.Item label="Paypal" value="paypal" />
                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '65%', justifyContent: 'center' }}>
                  <Text>Total</Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Text>{this.state.summaryCart.currency}</Text>
                </View>
                <View style={{ width: '25%', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>
                    {this.state.summaryCart.total}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '65%', justifyContent: 'center' }}>
                  <Text>Discount</Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Text>{this.state.summaryCart.currency}</Text>
                </View>
                <View style={{ width: '25%', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>
                    {this.state.summaryCart.total_discount}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '65%', justifyContent: 'center' }}>
                  <Text>Grand Total</Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Text>{this.state.summaryCart.currency}</Text>
                </View>
                <View style={{ width: '25%', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>
                    {this.state.summaryCart.final_price}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
        {!this.state.downloadSuccess && (
          <Button
            title="Next"
            buttonStyle={{ width: '96%', marginLeft: 10, marginBottom: 5, marginRight: 10 }}
            onPress={this.paymentWithPaypal.bind(
              this,
              this.state.summaryCart.final_price,
              this.state.summaryCart.currency
            )}
          />
        )}
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user,
  logged: sessionReducer.logged,
  token: sessionReducer.token
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryCart);
