import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import TemplatesTable from "./TemplatesTable";
import Login from "./Login";
import axios from "axios";
import Keycloak from "keycloak-js";

require('dotenv').config();

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authenticated: false,
    }
  }

  // componentDidMount() {
  //   const authUrl = `${process.env.REACT_APP_KEYCLOAK_AUTH_URL}`;
  //   const realm = `${process.env.REACT_APP_KEYCLOAK_REALM}`;
  //   const clientId = `${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`;
  //
  //   const keycloak = Keycloak({
  //     url: authUrl,
  //     realm: realm,
  //     clientId: clientId
  //   });
  //   keycloak.init(
  //     {onLoad: 'login-required'}
  //   ).then(authenticated => {
  //     if (authenticated) {
  //       sessionStorage.setItem('kc_token', keycloak.token);
  //       sessionStorage.setItem('kc_refreshToken', keycloak.refreshToken);
  //       this.setState({authenticated: authenticated})
  //     }
  //   });
  //   axios.interceptors.request.use(config => (
  //     keycloak.updateToken(5)
  //       .then(refreshed => {
  //         if (refreshed) {
  //           sessionStorage.setItem('kc_token', keycloak.token);
  //           sessionStorage.setItem('kc_refreshToken', keycloak.refreshToken);
  //         }
  //         config.headers.Authorization = 'Bearer ' + keycloak.token;
  //         return Promise.resolve(config)
  //       })
  //       .catch(() => {
  //         keycloak.login();
  //       })
  //   ));
  // }

  render() {
    let isAuthenticated = this.state.authenticated;
     return (
      //   isAuthenticated ? (
      // <div>
      //   <NavigationBar />
      //
      //     <div className={'container'}>
      //       <TemplatesTable/>
      //     </div>
      //
      //
      // </div>
      //       ) : null
       <div className={'fullscreen'}>
       <Login></Login>
       </div>

    );
  }
}

export default App;
