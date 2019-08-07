import axios from 'axios';
import * as url from '../../../api/apiConst';

export const createAPI = axios.create({
  baseURL: url.BASE_URL,
  responseType: 'json'
});

export const getListCategoryAPI = async token => {
  console.log('getListCategoryAPI token', token);
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.get(url.GETCATEGORY_URL, config);
    console.log('getListCategoryAPI response', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addNewCategoryAPI = async (token, newCategory) => {
  console.log('addNewCategoryAPI token', newCategory + ' ' + token);
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.post(url.GETCATEGORY_URL, { category_name: newCategory }, config);
    console.log('addNewCategoryAPI response', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCategoryAPI = async (token, categoryId) => {
  console.log('deleteCategoryAPI token', categoryId + ' ' + token);
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.delete(url.DELETECATEGORY_URL + categoryId, config);
    console.log('deletecategoryapi', response);
    return response.data;
  } catch (error) {
    console.log('deletecategoryapi error', error);
    return error;
  }
};
