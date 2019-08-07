import axios from 'axios';
import * as url from './apiConst';

export const createAPI = axios.create({
  baseURL: url.BASE_URL,
  responseType: 'json'
});

export const getUserProfile = async token => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };
  try {
    const response = await createAPI.get(url.GETUSERPROFILE_URL, config);
    console.log('getUserProfile api', response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserProfile = async (token, userId, email, firstName, lastName, role) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.put(
      url.UPDATEPROFILE_URL + userId,
      { email: email, firstname: firstName, lastname: lastName, role_id: role },
      config
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const changeUserPassword = async (token, email, oldPassword, newPassword) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };

  try {
    const response = await createAPI.put(
      url.CHANGEPASSWORD_URL,
      { email: email, old_password: oldPassword, new_password: newPassword },
      config
    );
    console.log('changeUserPassword response', response);
    return response.data;
  } catch (error) {
    console.log('changeUserPassword error', error);
    return error;
  }
};

export const activateBalance = async (token, email) => {
  let config = {
    headers: { Authorization: 'Bearer '.concat(token) }
  };
  try {
    const response = await createAPI.post(url.GETUSERPROFILE_URL, { email: email }, config);
    return response.data;
  } catch (error) {
    return error;
  }
};
