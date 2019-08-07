import * as types from '../../actions/session/actionsTypes';

const initialState = {
  restoring: false,
  loading: false,
  user: {},
  error: null,
  logged: null,
  registered: null,
  product: null,
  cart: {},
  token: null,
  message: ''
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SESSION_RESTORING:
      console.log('SESSION_RESTORING');
      return { ...state, restoring: true };
    case types.SESSION_LOADING:
      console.log('SESSION_LOADING');
      return { ...state, restoring: false, loading: true, error: null };
    case types.SESSION_SUCCESS:
      console.log('SESSION_SUCCESS');
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: true,
        registered: null,
        product: null,
        cart: action.cart,
        token: action.token,
        message: ''
      };
    case types.SIGNUP_SUCCESS:
      //return initialState;
      console.log('SIGNUP_SUCCESS', action);
      return {
        ...state,
        restoring: false,
        loading: false,
        user: {},
        error: null,
        logged: null,
        registered: true,
        product: null,
        cart: {},
        token: null,
        message: action.message
      };
    case types.SESSION_ERROR:
      console.log('SESSION_ERROR');
      return {
        ...state,
        restoring: false,
        loading: false,
        user: null,
        error: action.error,
        logged: null,
        registered: null,
        product: null,
        cart: [],
        token: null,
        message: ''
      };
    case types.SESSION_LOGOUT:
      console.log('SESSION_LOGOUT');
      return initialState;
    case types.SELECTED_PRODUCT:
      console.log('SELECTED_PRODUCT', action);
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: null,
        registered: null,
        product: action.product,
        cart: action.cart,
        token: action.token,
        message: ''
      };
    case types.SESSION_CART:
      console.log('SESSION_CART', action);
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: null,
        registered: null,
        product: null,
        cart: action.cart,
        token: action.token,
        message: ''
      };
    case types.SESSION_DEFAULT:
      console.log('SESSION_DEFAULT');
      return {
        ...state,
        restoring: false,
        loading: false,
        user: {},
        error: null,
        logged: null,
        registered: null,
        product: null,
        cart: {},
        token: null,
        message: ''
      };
    default:
      console.log('DEFAULT');
      return state;
  }
};

export default sessionReducer;
