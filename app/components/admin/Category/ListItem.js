import React, { Component } from 'react';
import { View, Text, ListItem, Left, Right, Icon, Toast } from 'native-base';
import { Alert } from 'react-native';
import { getListCategoryAPI, deleteCategoryAPI } from './Action';
//import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

class ListItemCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      token: this.props.token
    };
  }

  componentWillMount() {
    console.log('listitem component dit mount');
    this.getListCategory(this.state.token);
  }

  getListCategory = token => {
    getListCategoryAPI(token)
      .then(response => {
        console.log(response);
        this.setState({
          categories: response.data.list
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDeleteCategory = categoryId => {
    Alert.alert('Delete Category', 'Are you sure to delete category ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel')
      },
      {
        text: 'OK',
        onPress: this.deleteCategory.bind(this, categoryId)
      }
    ]);
  };

  deleteCategory = categoryId => {
    deleteCategoryAPI(this.state.token, categoryId)
      .then(response => {
        console.log('handleDeleteCategory', response);
        if (response.code == 200) {
          var array = this.state.categories.filter(function(item) {
            return item.category_id !== categoryId;
          });
          this.setState({
            categories: array
          });
          Toast.show({
            text: response.message,
            buttonText: 'Okay',
            type: 'success',
            position: 'top',
            duration: 3000
          });
        } else {
          Toast.show({
            text: response.message,
            buttonText: 'Okay',
            type: 'error',
            position: 'top',
            duration: 3000
          });
        }
      })
      .catch(error => {
        console.log('handleDeleteCategory error', error);
        Toast.show({
          text: error,
          buttonText: 'Okay',
          type: 'error',
          position: 'top',
          duration: 3000
        });
      });
  };

  renderData = () => {
    console.log('listitem render data');
    const data = this.state.categories;
    console.log('listitem render data 3', data);
    if (data.length === 0) {
      console.log('listitem render data 4', data);
      return (
        <ListItem key={0}>
          <Left>
            <Text>Loading...</Text>
          </Left>
        </ListItem>
      );
    }

    return data.map(item => {
      return (
        <ListItem key={item.category_id}>
          <Left>
            <Text>{item.category_name}</Text>
          </Left>
          <Right>
            <Icon
              name="md-trash"
              style={{ fontSize: 28, color: 'red' }}
              onPress={this.handleDeleteCategory.bind(this, item.category_id)}
            />
          </Right>
        </ListItem>
      );
    });
  };

  render() {
    const { elements } = this.state.categories;
    return <View items={elements}>{this.renderData()}</View>;
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
)(ListItemCategory);
