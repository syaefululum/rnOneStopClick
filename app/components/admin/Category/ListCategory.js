import React, { Component } from 'react';
import { Root, Container, Content, Item, Input, Left, Right, Icon, ListItem, Toast } from 'native-base';
import ListItemCategory from './ListItem';
import { connect } from 'react-redux';
import { addNewCategoryAPI } from './Action';

class AdminCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      newCategory: {
        value: '',
        error: false
      }
    };
  }

  handlingAddCategory = () => {
    if (this.state.newCategory.value == '') {
      this.setState({
        newCategory: {
          value: '',
          error: true
        }
      });
      Toast.show({
        text: 'Category must be filled',
        buttonText: 'Okay',
        type: 'error',
        position: 'top',
        duration: 3000
      });
    } else {
      console.log('save new category');
      addNewCategoryAPI(this.state.token, this.state.newCategory.value)
        .then(response => {
          console.log(response);
          if (response.code == 201) {
            this.setState({
              newCategory: {
                value: '',
                error: false
              }
            });

            Toast.show({
              text: response.message,
              buttonText: 'Okay',
              type: 'success',
              position: 'top',
              duration: 3000
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <Root>
        <Container>
          <Content>
            <ListItem>
              <Left>
                <Input
                  placeholder="Add New Category"
                  value={this.state.newCategory.value}
                  onChangeText={text => {
                    this.setState({
                      newCategory: {
                        value: text,
                        error: false
                      }
                    });
                  }}
                />
              </Left>
              <Right>
                <Icon
                  name="md-add-circle"
                  style={{ fontSize: 28, color: 'green' }}
                  onPress={this.handlingAddCategory.bind(this)}
                />
              </Right>
            </ListItem>
            <ListItemCategory />
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
)(AdminCategory);
