import { NavigationActions, StackActions } from 'react-navigation';
let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

const navigateRoot = (routeNAme, params) => {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName, params })]
    })
  );
};

function pop() {
  navigator.dispatch(StackActions.pop());
}

export default {
  navigate,
  navigateRoot,
  pop,
  setTopLevelNavigator
};
