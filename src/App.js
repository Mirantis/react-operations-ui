import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import TemplatesTable from './TemplatesTable';
import Login from './Login';

import AxiosInstance from './Interceptor'
import axios from "axios";

class App extends Component {

  constructor(props, context) {
    super(props, context);
    let isLoggedin = sessionStorage.getItem('authenticated');

    this.state = {
      authenticated: isLoggedin,
    }
  }

  setAuthenticated = (value) => {
    this.setState({authenticated: value})
  };


  render() {
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
            this.setAuthenticated(false)
          })
      } else {

        return error.response
      }

    });

    let isAuthenticated = this.state.authenticated;
    return (

      isAuthenticated ? (
        <div>
          <NavigationBar/>

          <div className={'container'}>
            <TemplatesTable/>
          </div>
        </div>
      ) : (

        <div>
          <Login setAuthenticated={this.setAuthenticated}/>
        </div>
      )
    )
  }
}

export default App;
