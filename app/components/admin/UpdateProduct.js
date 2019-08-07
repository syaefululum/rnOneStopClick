import React, { Component } from 'react';
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
  Root,
  Spinner
} from 'native-base';
import { View, TouchableOpacity, Image } from 'react-native';
import { getAllCategory, getSubCatByCatId, getProductDetail, updateProductDetail } from '../../api/productAPI';
import NumberFormat from 'react-number-format';
import FilePickerManager from 'react-native-file-picker';

class UpdateProduct extends Component {
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
        value: '',
        error: false
      },
      selectedSubCategory: {
        value: '',
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
      token: this.props.token,
      isLoading: true,
      updateProductId: ''
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    this.setState({
      updateProductId: navigation.getParam('itemId', 'NO-ID')
    });
    getProductDetail(this.state.token, navigation.getParam('itemId', 'NO-ID'))
      .then(response => {
        console.log('getProductdetail response', response);
        this.setState({
          inputName: {
            value: response.data.name,
            error: false
          },
          inputPrice: {
            value: response.data.price.toString(),
            error: false
          },
          inputDescription: {
            value: response.data.description,
            error: false
          },
          selectedCategory: {
            value: response.data.category_id,
            error: false
          },
          selectedSubCategory: {
            value: response.data.subcategory_id,
            error: false
          }
        });

        this.handlingOnSelectCategory(response.data.category_id);
      })
      .catch(error => {
        console.log('error get product details');
      });

    getAllCategory(this.state.token)
      .then(response => {
        this.setState({ category: response.data.list });
      })
      .catch(error => {
        console.log('getAllCategorynerror', error);
      });
  }

  handlingOnSelectCategory = catId => {
    console.log('handlingOnSelectCategory', catId);
    getSubCatByCatId(catId)
      .then(response => {
        console.log('handlingOnSelectCategory 2', response);
        if (response.code == 200) {
          let data = Array.from(response.data);
          this.setState({ subCategory: data });
        } else {
          return <Picker.Item key={null} label="Please select one" value={null} />;
        }
        this.setState({
          isLoading: false
        });
      })
      .catch(error => {
        return <Picker.Item key={null} label="Please select one" value={null} />;
      });
  };

  handlingCancelButton = () => {
    this.props.navigation.navigate('AdminProduct');
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

  handlingSelectFile = type => {
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
        if (type == 'thumbnail') {
          this.setState({
            selectedThumbnail: {
              file: response,
              error: false
            }
          });
        } else if (type == 'file') {
          this.setState({
            selectedFile: {
              file: response,
              error: false
            }
          });
        } else if (type == 'preview') {
          this.setState({
            selectedPreview: {
              file: response,
              error: false
            }
          });
        }
      }
    });
  };

  handlingUpdateButton = () => {
    isError = false;
    if (this.state.inputName.value === '') {
      this.setState({
        inputName: {
          value: '',
          error: true
        }
      });
      isError = true;
    }

    if (this.state.inputPrice.value === '') {
      this.setState({
        inputPrice: {
          value: '',
          error: true
        }
      });
      isError = true;
    } else {
      if (isNaN(this.state.inputPrice.value)) {
        this.setState({
          inputPrice: {
            value: '',
            error: true
          }
        });
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
      isError = true;
    }

    console.log('update this state', this.state);
    if (!isError) {
      const updateProduct = new FormData();
      updateProduct.append('name', this.state.inputName.value);
      updateProduct.append('description', this.state.inputDescription.value);
      updateProduct.append('subcategory_id', this.state.selectedSubCategory.value);
      console.log('this.state.inputPrice.value', this.state.inputPrice.value);
      updateProduct.append('price', this.state.inputPrice.value.replace(/[^0-9 ]/g, ''));

      if (this.state.selectedThumbnail.file.fileName) {
        updateProduct.append('thumbnail', {
          name: this.state.selectedThumbnail.file.fileName,
          uri: this.state.selectedThumbnail.file.uri,
          type: this.state.selectedThumbnail.file.type,
          path: this.state.selectedThumbnail.file.path
        });
      }
      if (this.state.selectedFile.file.fileName) {
        updateProduct.append('file', {
          name: this.state.selectedFile.file.fileName,
          uri: this.state.selectedFile.file.uri,
          type: this.state.selectedFile.file.type,
          path: this.state.selectedFile.file.path
        });
      }
      if (this.state.selectedPreview.file.fileName) {
        updateProduct.append('preview', {
          name: this.state.selectedPreview.file.fileName,
          uri: this.state.selectedPreview.file.uri,
          type: this.state.selectedPreview.file.type,
          path: this.state.selectedPreview.file.path
        });
      }

      console.log('formdata updateForm', updateProduct);
      updateProductDetail(this.state.token, this.state.updateProductId, updateProduct)
        .then(response => {
          console.log('updateProductDetail response', response);
          if (response.code == 200) {
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
          console.log('error');
          isError = true;
          Toast.show({
            text: error,
            buttonText: 'Okay',
            type: 'danger',
            position: 'top',
            duration: 5000
          });
        });
    }
  };

  render() {
    return (
      <Root>
        <Container>
          {this.state.isLoading ? (
            <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
              <Spinner />
            </Content>
          ) : (
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
                      {/* {this.state.selectedThumbnail.file.uri ? (
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={{ uri: this.state.selectedThumbnail.file.uri }}
                        />
                      ) : null} */}
                    </View>
                    <TouchableOpacity
                      style={{ alignSelf: 'flex-start', backgroundColor: '#DDDDDD', paddingHorizontal: 5 }}
                      onPress={this.handlingSelectFile.bind(this, 'thumbnail')}
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
                      {/* {this.state.selectedFile.file.uri ? (
                        <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.selectedFile.file.uri }} />
                      ) : null} */}
                    </View>
                    <TouchableOpacity
                      style={{ alignSelf: 'flex-start', backgroundColor: '#DDDDDD', paddingHorizontal: 5 }}
                      onPress={this.handlingSelectFile.bind(this, 'file')}
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
                    {/* {this.state.selectedPreview.file.uri ? (
                      <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.selectedPreview.file.uri }} />
                    ) : null} */}
                    <TouchableOpacity
                      style={{ alignSelf: 'flex-start', backgroundColor: '#DDDDDD', paddingHorizontal: 5 }}
                      onPress={this.handlingSelectFile.bind(this, 'preview')}
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
                      <Button full onPress={this.handlingUpdateButton.bind(this)}>
                        <Text>Update</Text>
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
          )}
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = ({ sessionReducer }) => ({
  user: sessionReducer.user,
  token: sessionReducer.token,
  product: sessionReducer.product
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProduct);
