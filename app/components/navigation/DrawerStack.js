import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeContainer from '../home/index';
import ProductDetailsContainer from '../productDetails/index';
import ListCartContainer from '../cart/index';
import SummaryCartContainer from '../cart/summaryCart';
import ProfileContainer from '../profile/profile';
import AdminProduct from '../admin/product';
import NewProduct from '../admin/NewProduct';
import UpdateProduct from '../admin/UpdateProduct';
import AdminCategory from '../admin/Category/ListCategory';

import TabHeader from './TabHeader';
import SideBar from './SideBar';

const getNavigationConfig = title => ({
  navigationOptions: () => ({
    header: props => <TabHeader {...props} title={title} />
  })
});

// create navigator for movie page
const movieNav = createStackNavigator(
  {
    HomeContainer: {
      screen: HomeContainer,
      ...getNavigationConfig('Home')
    },
    ProductDetailsContainer: {
      screen: ProductDetailsContainer,
      ...getNavigationConfig('Product Details')
    },
    ListCartContainer: {
      screen: ListCartContainer,
      ...getNavigationConfig('List Cart')
    },
    SummaryCartContainer: {
      screen: SummaryCartContainer,
      ...getNavigationConfig('Summary Cart')
    },
    ProfileContainer: {
      screen: ProfileContainer,
      ...getNavigationConfig('Profile')
    },
    AdminProduct: {
      screen: AdminProduct,
      ...getNavigationConfig('Admin Product')
    },
    NewProduct: {
      screen: NewProduct,
      ...getNavigationConfig('New Product')
    },
    UpdateProduct: {
      screen: UpdateProduct,
      ...getNavigationConfig('Update Product')
    },
    AdminCategory: {
      screen: AdminCategory,
      ...getNavigationConfig('Admin Category')
    }
  },
  getNavigationConfig()
);

export const DrawerStack = createDrawerNavigator(
  {
    movieNav: { screen: movieNav }
  },
  {
    headerMode: 'screen',
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: 298,
    drawerPosition: 'left'
  }
);

export default DrawerStack;
