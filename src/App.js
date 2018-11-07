import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import TemplatesTable from './TemplatesTable';
import Login from './Login';
import SecuredData from './Interceptor'


class App extends Component {

  constructor(props, context) {
    super(props, context);
    //let isLoggedin = sessionStorage.getItem('authenticated');
    let isLoggedin = this.context.authenticated;
    this.state = {
      authenticated: isLoggedin === 'true',
    }
  }

  setAuthenticated = (value) => {
    this.setState({authenticated: value})
  };


  render() {

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
    );
  }
}


export default App;

export const AuthContext = React.createContext(
  {authorized: false}
);

App.contextType = AuthContext;