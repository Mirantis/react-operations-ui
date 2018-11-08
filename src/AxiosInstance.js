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


export default AxiosInstance;
