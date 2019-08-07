import firebaseService from '../../enviroments/firebase';
import rnfirebase from 'react-native-firebase';

import * as types from './actionsTypes';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import * as urlapi from '../../api/api';

export const restoreSession = () => dispatch => {
  console.log('restoreSession');
  dispatch(sessionLoading());
  dispatch(sessionRestoring());

  firebaseService.auth().onAuthStateChanged(user => {
    // console.log('sessionSuccess');
    // console.log('user', user);
    if (user) {
      if (user.emailVerified) {
        //console.log('emailVerified', user);
        dispatch(sessionSuccess(user));
      } else {
        dispatch(sessionSuccess(user));
      }
    } else {
      dispatch(sessionLogout());
    }
  });
};

export const loginGoogle = () => dispatch => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '698076673696-rro56t8ke5uith12hvnl8jo139293vmu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });
  GoogleSignin.signIn()
    .then(data => {
      console.log('google', data);
      const resp = urlapi.loginSocmedAPI(data.user.email, data.user.givenName, data.user.familyName, 'google');
      resp
        .then(response => {
          console.log('login to local data', response);
          if (response.code == 200) {
            dispatch(sessionSuccess(response.data.user, response.data.token));
          } else {
            dispatch(sessionError(response.message));
          }
        })
        .catch(error => {
          dispatch(sessionError(error.message));
        });
      // const credential = rnfirebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // rnfirebase
      //   .auth()
      //   .signInWithCredential(credential)
      //   .then(user => {
      //     dispatch(sessionSuccess(user.user));
      //   })
      //   .catch(error => {
      //     dispatch(sessionError(error.message));
      //   });
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const loginUser = (email, password) => dispatch => {
  dispatch(sessionLoading());
  try {
    urlapi
      .loginUserAPI(email, password)
      .then(response => {
        console.log('loginUserAPI action response', response);
        if (response.code == 200) {
          urlapi
            .listCartAPI(response.data.token)
            .then(resp => {
              console.log('listCartAPI resp', resp);
              if (resp.code == 200) {
                dispatch(sessionSuccess(response.data.user, response.data.token, resp.data));
                dispatch(sessionCart(resp.data, response.data.user, response.data.token));
              } else {
                dispatch(sessionError(resp.message));
              }
            })
            .catch(err => {
              console.log('listCartAPI err', err);
              dispatch(sessionError(err));
            });
        } else {
          dispatch(sessionError(response.message));
        }
      })
      .catch(error => {
        console.log('loginUserAPI action error', error);
        dispatch(sessionError(error));
      });
  } catch (error) {
    console.log('try catch error', error);
  }

  // urlapi.loginUserAPI(email, password)
  //   .then(response => {
  //     // dispatch(sessionSuccess(response.data.user, response.data.token));
  //     console.log('resp 2', response);
  //     if (response.code == 200) {
  //       const cart = urlapi.listCartAPI(response.data.token);
  //       cart
  //         .then(resp => {
  //           console.log('resp 3', resp);
  //           dispatch(sessionCart(resp.data, response.data.user, response.data.token));
  //           dispatch(sessionSuccess(response.data.user, response.data.token, resp.data));
  //         })
  //         .catch(error => {
  //           console.log('cart err', error);
  //         });
  //     } else {
  //       dispatch(sessionError(response.message));
  //     }
  //   })
  //   .catch(error => {
  //     console.log('User error', error);
  //     dispatch(sessionError(error.message));
  //   });
};
// firebaseService
//   .auth()
//   .signInWithEmailAndPassword(email, password)
//   .then(user => {
//     dispatch(sessionSuccess(user.user));
//   })
//   .catch(error => {
//     dispatch(sessionError(error.message));
//   });

export const signupUser = (email, password, firstName, lastName) => dispatch => {
  dispatch(sessionLoading());
  const response = urlapi.registrationAPI(email, password, firstName, lastName);
  response
    .then(resp => {
      console.log('reg success', resp);
      if (resp.code == 201) {
        dispatch(signupSuccess(resp.message));
      } else {
        dispatch(sessionError(resp.message));
      }
    })
    .catch(error => {
      console.log('reg error', error);
      dispatch(sessionError(error));
    });
};

export const logoutUser = () => dispatch => {
  dispatch(sessionLoading());
  dispatch(sessionLogout());
};

export const selectedProduct = (product, user, token, cart) => dispatch => {
  //dispatch(sessionLoading());
  dispatch(sessionProduct(product, user, token, cart));
};

export const setCart = (cart, user, token) => dispatch => {
  console.log('action setCart');
  dispatch(sessionCart(cart, user, token));
};

export const setDefault = () => dispatch => {
  console.log('sessionDafult');
  dispatch(sessionDafult());
};

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
  type: types.SESSION_LOADING
});

const sessionSuccess = (user, token, cart) => ({
  type: types.SESSION_SUCCESS,
  user,
  token,
  cart
});

const signupSuccess = message => ({
  type: types.SIGNUP_SUCCESS,
  message
});

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
});

const sessionProduct = (product, user, token, cart) => ({
  type: types.SELECTED_PRODUCT,
  product,
  user,
  token,
  cart
});

const sessionCart = (cart, user, token) => ({
  type: types.SESSION_CART,
  cart,
  user,
  token
});

const sessionDafult = () => ({
  type: types.SESSION_DEFAULT
});
