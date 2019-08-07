import axios from 'axios';
import * as url from './apiConst';

export const createAPI = axios.create({
  baseURL: url.BASE_URL,
  responseType: 'json'
});

export const getAllProducts = async (token, page, limit) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };
  console.log('page', page);
  console.log('limit', limit);

  try {
    const response = await createAPI.get(url.GETPRODUCTS_URL + '?page=' + page + '$size=' + limit, config);
    console.log('getAllProducts response', response);
    return response.data;
  } catch (error) {
    console.log('getAllProducts error', error);
    return error;
  }
};

export const getAllCategory = async token => {
  console.log('token', token);
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.get(url.GETCATEGORY_URL, config);
    console.log('getAllCategory response', response);
    return response.data;
  } catch (error) {
    console.log('getAllCategory error', response);
    return error;
  }
};

export const getSubCatByCatId = async catId => {
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await createAPI.get(url.GETSUBCATBYCATID_URL + '?id=' + catId, config);
    console.log('getSubCatByCatId response', response);
    return response.data;
  } catch (error) {
    console.log('getSubCatByCatId error', response);
    return error;
  }
};

export const createProduct = async (token, data) => {
  let config = {
    headers: {
      Authorization: 'Bearer '.concat(token),
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const response = await createAPI.post(url.CREATENEWPRODUCT_URL, data, config);
    console.log('createProduct response', response);
    return response.data;
  } catch (error) {
    console.log('createProduct error', error);
    return error.response.data;
  }
};

export const getProductDetail = async (token, productId) => {
  let config = {
    headers: {
      Authorization: 'Bearer '.concat(token)
    }
  };

  try {
    const response = await createAPI.get(url.GETADMINPRODUCT_URL + productId, config);
    console.log('createProduct response', response);
    return response.data;
  } catch (error) {
    console.log('createProduct error', error);
    return error.response.data;
  }
};

export const updateProductDetail = async (token, productId, data) => {
  let config = {
    headers: {
      Authorization: 'Bearer '.concat(token)
    }
  };

  try {
    const response = await createAPI.put(url.GETADMINPRODUCT_URL + productId, data, config);
    console.log('updateProductDetail response', response);
    return response.data;
  } catch (error) {
    console.log('updateProductDetail error', error);
    return error.response.data;
  }
};

export const deleteProductDetail = async (token, productId) => {
  let config = {
    headers: {
      Authorization: 'Bearer '.concat(token)
    }
  };

  try {
    const response = await createAPI.delete(url.GETADMINPRODUCT_URL + productId, config);
    console.log('deleteProductDetail response', response);
    return response.data;
  } catch (error) {
    console.log('deleteProductDetail error', error);
    return error.response.data;
  }
};
