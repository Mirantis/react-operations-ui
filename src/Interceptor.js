import axios from 'axios'

require('dotenv').config();

const AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_OPERATIONS_API_URL}/api/v1`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json'
});

AxiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const originalRequest = error.config;
  if (!error.response) {
    return Promise.reject('Network Error')
  }
  else if ((error.response.status === 401) && !originalRequest._retry) {
    originalRequest._retry = true;
    return axios.post(`${process.env.REACT_APP_OPERATIONS_API_URL}/api/v1/auth/relogin`, {
      'refresh_token': sessionStorage.getItem('refreshToken')
    }).then(res => {
      const access_token = res.data['access_token'];

      sessionStorage.setItem('token', access_token);
      sessionStorage.setItem('refreshToken', res.data['refresh_token']);
      AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
      return axios(originalRequest);
    })
      .catch(err => {
        // Refresh token is expired
        sessionStorage.setItem('authenticated', 'false');
        return Promise.reject(err);
      })
  } else {

    //return Promise.reject(error);
    return error.response
  }

});

export default AxiosInstance