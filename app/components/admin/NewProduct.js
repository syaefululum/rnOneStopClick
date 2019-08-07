import React, { Component } from 'react';
import { TouchableOpacity, View, PermissionsAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Textarea,
  Picker,
  Text,
  Button,
  Right,
  Icon,
  Toast,
  Root
} from 'native-base';
import FilePickerManager from 'react-native-file-picker';
import { getAllCategory, getSubCatByCatId, createProduct } from '../../api/productAPI';
import NumberFormat from 'react-number-format';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: {
        value: '',
        error: false
      },
      inputPrice: {
        value: '',
        error: false
      },
      inputDescription: {
        value: '',
        error: false
      },
      category: [],
      subCategory: [],
      selectedCategory: {
        value: null,
        error: false
      },
      selectedSubCategory: {
        value: null,
        error: false
      },
      selectedThumbnail: {
        file: {},
        error: false
      },
      selectedFile: {
        file: {},
        error: false
      },
      selectedPreview: {
        file: {},
        error: false
      },
      token: this.props.token
    };
  }

  componentWillMount() {
    console.log('state', this.state);
    getAllCategory(this.state.token)
      .then(response => {
        this.setState({ category: response.data.list });
      })
      .catch(error => {
        console.log('getAllCategorynerror', error);
      });
  }

  requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
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

  selectThumbnail = () => {
    const options = {
      title: 'File Picker',
      chooseFileButtonTitle: 'Choose File...'
    };

    FilePickerManager.showFilePicker(options, response => {
      console.log('response', response);
      console.log('options', options);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('User tapped custom button kejutan: ', response);
        this.setState({
          selectedThumbnail: {
            file: response,
            error: false
          }
        });
      }
    });
  };

  selectFile = () => {
    const options = {
      title: 'File Picker',
      chooseFileButtonTitle: 'Choose File...'
    };

    FilePickerManager.showFilePicker(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('User tapped custom button: ', response);
        this.setState({
          selectedFile: {
            file: response,
            error: false
          }
        });
      }
    });
  };

  selectPreview = () => {
    const options = {
      title: 'File Picker',
      chooseFileButtonTitle: 'Choose File...'
    };

    FilePickerManager.showFilePicker(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('User tapped custom button: ', response);
        this.setState({
          selectedPreview: {
            file: response,
            error: false
          }
        });
      }
    });
  };

  handlingOnSelectCategory = catId => {
    getSubCatByCatId(catId)
      .then(response => {
        if (response.code == 200) {
          let data = Array.from(response.data);
          this.setState({ subCategory: data });
        } else {
          return <Picker.Item key={null} label="Please select one" value={null} />;
        }
      })
      .catch(error => {
        return <Picker.Item key={null} label="Please select one" value={null} />;
      });
  };

  handlingCancelButton = () => {
    this.props.navigation.navigate('AdminProduct');
  };

  handlingSaveButton = () => {
    console.log('handlingSaveButton', this.state);
    isError = false;

    if (this.state.inputName.value === '') {
      this.setState({
        inputName: {
          value: '',
          error: true
        }
      });
      // this.state.inputName.error = true;
      isError = true;
    }

    if (this.state.inputPrice.value === '') {
      this.setState({
        inputPrice: {
          value: '',
          error: true
        }
      });
      //this.state.inputPrice.error = true;
      isError = true;
    } else {
      if (isNaN(this.state.inputPrice.value)) {
        this.setState({
          inputPrice: {
            value: '',
            error: true
          }
        });
        //this.state.inputPrice.error = true;
        isError = true;
      }
    }

    if (this.state.inputDescription.value === '') {
      this.setState({
        inputDescription: {
          value: '',
          error: true
        }
      });
      this.state.inputDescription.error = true;
      isError = true;
    }

    if (this.state.selectedCategory.value == null) {
      this.setState({
        selectedCategory: {
          value: null,
          error: true
        }
      });
      isError = true;
    }

    if (this.state.selectedSubCategory.value == null) {
      this.setState({
        selectedSubCategory: {
          value: null,
          error: true
        }
      });
      isError = true;
    }

    if (!isError) {
      const newProduct = new FormData();
      newProduct.append('name', this.state.inputName.value);
      newProduct.append('description', this.state.inputDescription.value);
      newProduct.append('subcategory_id', this.state.selectedSubCategory.value);
      newProduct.append('price', this.state.inputPrice.value.replace(/[^0-9 ]/g, ''));

      if (this.state.selectedThumbnail.file.fileName) {
        newProduct.append('thumbnail', {
          name: this.state.selectedThumbnail.file.fileName,
          uri: this.state.selectedThumbnail.file.uri,
          type: this.state.selectedThumbnail.file.type,
          path: this.state.selectedThumbnail.file.path
        });
      }

      if (this.state.selectedFile.file.fileName) {
        newProduct.append('file', {
          name: this.state.selectedFile.file.fileName,
          uri: this.state.selectedFile.file.uri,
          type: this.state.selectedFile.file.type,
          path: this.state.selectedFile.file.path
        });
      }

      if (this.state.selectedPreview.file.fileName) {
        newProduct.append('preview', {
          name: this.state.selectedPreview.file.fileName,
          uri: this.state.selectedPreview.file.uri,
          type: this.state.selectedPreview.file.type,
          path: this.state.selectedPreview.file.path
        });
      }

      console.log('true newproduct', newProduct);
      createProduct(this.state.token, newProduct)
        .then(response => {
          console.log('createProductcreateProduct', response);
          if (response.code == 201) {
            Toast.show({
              text: response.message,
              buttonText: 'Okay',
              type: 'success',
              position: 'top',
              duration: 5000,
              onClose: this.handlingCancelButton.bind(this)
            });
          } else {
            isError = true;
            Toast.show({
              text: response.message,
              buttonText: 'Okay',
              type: 'danger',
              position: 'top',
              duration: 5000
            });
          }
        })
        .catch(error => {
          console.log('createProduct catch error', error);
          isError = true;
          Toast.show({
            text: response.message,
            buttonText: 'Okay',
            type: 'danger',
            position: 'top',
            duration: 5000
          });
        });
    } else {
      console.log('error newproduct', this.state);
      console.log('error newproduct', this.state.inputPrice.value.replace(/[^0-9 ]/g, ''));
    }
  };

  renderCategory = data => {
    data = Array.from(data);
    if (data.length != 0) {
      return data.map(item => {
        return <Picker.Item key={item.category_id} label={item.category_name} value={item.category_id} />;
      });
    } else {
      return <Picker.Item key={null} label="Please select one" value={null} />;
    }
  };

  renderSubCategory = data => {
    if (data.length != 0) {
      return data.map(item => {
        return <Picker.Item key={item.subcategory_id} label={item.subcategory_name} value={item.subcategory_id} />;
      });
    } else {
      return <Picker.Item key={null} label="Please select one" value={null} />;
    }
  };

  render() {
    //this.requestStoragePermission();
    return (
      <Root>
        <Container>
          <Content>
            <Form style={{ marginRight: 10 }}>
              <Item stackedLabel>
                <Label>Name</Label>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Input
                    value={this.state.inputName.value}
                    onChangeText={text => {
                      this.setState({
                        inputName: {
                          value: text,
                          error: false
                        }
                      });
                    }}
                  />
                  {this.state.inputName.error ? (
                    <Right>
                      <Icon active name="information-circle" style={{ color: 'red' }} />
                    </Right>
                  ) : null}
                </View>
              </Item>
              <Item stackedLabel>
                <Label>Price</Label>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <NumberFormat
                    value={this.state.inputPrice.value}
                    displayType={'text'}
                    prefix={'Rp'}
                    thousandSeparator={true}
                    renderText={value => (
                      <Input
                        value={value}
                        keyboardType="number-pad"
                        onChangeText={text => {
                          this.setState({
                            inputPrice: {
                              value: text,
                              error: false
                            }
                          });
                        }}
                      />
                    )}
                  />
                  {this.state.inputPrice.error ? (
                    <Right>
                      <Icon active name="information-circle" style={{ color: 'red' }} />
                    </Right>
                  ) : null}
                </View>
              </Item>
              <Item stackedLabel>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Label>Description</Label>
                  {this.state.inputDescription.error ? (
                    <Right>
                      <Icon active name="information-circle" style={{ color: 'red' }} />
                    </Right>
                  ) : null}
                </View>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Textarea"
                  style={{ width: '100%' }}
                  value={this.state.inputDescription.value}
                  onChangeText={text => {
                    this.setState({
                      inputDescription: {
                        value: text,
                        error: false
                      }
                    });
                  }}
                />
              </Item>
              <Item picker style={{ marginLeft: 15, flexDirection: 'row' }}>
                <Label style={{ fontSize: 15, alignSelf: 'flex-start', marginTop: 15 }}>Category</Label>
                <Picker
                  style={{ alignSelf: 'flex-end' }}
                  mode="dropdown"
                  placeholder="Select Category"
                  selectedValue={this.state.selectedCategory.value}
                  onValueChange={value => {
                    this.setState({
                      selectedCategory: {
                        value: value,
                        error: false
                      }
                    });
                    this.handlingOnSelectCategory(value);
                  }}
                >
                  <Picker.Item key={null} label="Please select one" value={null} />
                  {this.renderCategory(this.state.category)}
                </Picker>
                {this.state.selectedCategory.error ? (
                  <Right>
                    <Icon active name="information-circle" style={{ color: 'red' }} />
                  </Right>
                ) : null}
              </Item>
              <Item picker style={{ marginLeft: 15, flexDirection: 'row' }}>
                <Label style={{ fontSize: 15, alignSelf: 'flex-start', marginTop: 15 }}>Sub Category</Label>
                <Picker
                  style={{ alignSelf: 'flex-end' }}
                  mode="dropdown"
                  placeholder="Select Category"
                  selectedValue={this.state.selectedSubCategory.value}
                  onValueChange={value => {
                    this.setState({
                      selectedSubCategory: {
                        value: value,
                        error: false
                      }
                    });
                  }}
                >
                  {this.renderSubCategory(this.state.subCategory)}
                </Picker>
                {this.state.selectedSubCategory.error ? (
                  <Right>
                    <Icon active name="information-circle" style={{ color: 'red' }} />
                  </Right>
                ) : null}
              </Item>
              <Item stackedLabel>
                <Label>Thumbnail</Label>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start', marginTop: 10, marginBottom: 5 }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                      {this.state.selectedThumbnail.file.fileName ? this.state.selectedThumbnail.file.fileName : null}
                    </Text>
                    {this.state.selectedThumbnail.error ? (
                      <Right>
                        <Icon active name="information-circle" style={{ color: 'red' }} />
                      </Right>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: 'flex-start', backgroundColor: '#DDDDDD', paddingHorizontal: 5 }}
                    onPress={this.selectThumbnail.bind(this)}
                  >
                    <Text style={{ textAlign: 'right' }}>Choose file...</Text>
                  </TouchableOpacity>
                </View>
              </Item>
              <Item stackedLabel>
                <Label>File</Label>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start', marginTop: 10, marginBottom: 5 }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                      {this.state.selectedFile.file.fileName ? this.state.selectedFile.file.fileName : null}
                    </Text>
                    {this.state.selectedFile.error ? (
                      <Right>
                        <Icon active name="information-circle" style={{ color: 'red' }} />
                      </Right>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: 'flex-start', backgroundColor: '#DDDDDD', paddingHorizontal: 5 }}
                    onPress={this.selectFile.bind(this)}
                  >
                    <Text style={{ textAlign: 'right' }}>Choose file...</Text>
                  </TouchableOpacity>
                </View>
              </Item>
              <Item stackedLabel last>
                <Label>Preview</Label>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start', marginTop: 10, marginBottom: 5 }}>
                  <Text style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                    {this.state.selectedPreview.file.fileName ? this.state.selectedPreview.file.fileName : null}
                  </Text>
                  <TouchableOpacity
                    style={{ alignSelf: 'flex-start', backgroundColor: '#DDDDDD', paddingHorizontal: 5 }}
                    onPress={this.selectPreview.bind(this)}
                  >
                    <Text style={{ textAlign: 'right' }}>Choose file...</Text>
                  </TouchableOpacity>
                </View>
              </Item>
              <Item>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <Button full onPress={this.handlingSaveButton.bind(this)}>
                      <Text>Save</Text>
                    </Button>
                  </View>
                  <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                    <Button full danger onPress={this.handlingCancelButton.bind(this)}>
                      <Text>Cancel</Text>
                    </Button>
                  </View>
                </View>
              </Item>
            </Form>
          </Content>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = ({ sessionReducer }) => ({
  user: sessionReducer.user,
  token: sessionReducer.token
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProduct);
