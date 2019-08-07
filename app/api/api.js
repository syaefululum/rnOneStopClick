import axios from 'axios';
import * as url from './apiConst';

export const createAPI = axios.create({
  baseURL: url.BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const registrationAPI = async (email, password, firstName, lastName) => {
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await createAPI.post(
      url.SIGNUP_URL,
      {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName
      },
      config
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUserAPI = async (email, password) => {
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await createAPI.post(url.SIGNIN_URL, { email: email, password: password }, config);
    console.log('loginUserAPI response', response);
    return response.data;
  } catch (error) {
    console.log('loginUserAPI error', error);
    //return error;
    return error.response.data;
  }
};

export const loginSocmedAPI = async (email, firstname, lastname, origin) => {
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await createAPI.post(
      url.SIGNINSOCMED_URL,
      { email: email, firstname: firstname, lastname: lastname, origin: origin },
      config
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addCartAPI = async (productId, token) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };
  try {
    const response = await createAPI.post(url.ADDCART_URL + productId, {}, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const listCartAPI = async token => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };
  try {
    const response = await createAPI.get(url.LISTCART_URL, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCartAPI = async (cardId, token) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.delete(url.DELETECART_URL + cardId, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const summaryCartAPI = async (voucher, method, token) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.get(url.SUMMARYCART_URL + '?voucher=' + voucher + '&payment=' + method, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const doPayment = async (paymentData, token) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.post(url.DOPAYMENT_URL, paymentData, config);
    if (response.status == 200) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getProducts = async token => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };
  try {
    const response = await createAPI.get(url.GETPRODUCT_URL, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getDetailProduct = async (productId, token) => {
  let config = {};
  if (token !== '') {
    config.headers = { Authorization: 'Bearer '.concat(token) };
  }
  try {
    const response = await createAPI.get(url.PRODUCTDETAIL_URL + '?id=' + productId, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const downloadValidation = async (productId, token) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.get(url.DOWNLOADVALIDATION_URL + '?productid=' + productId, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const downloadFile = async (productId, token) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.get(url.DOWNLOADFILE_URL + '?productid=' + productId, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
