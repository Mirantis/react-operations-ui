import React, {Component} from 'react';
import {Form, Button, Input, FormGroup, Alert} from 'reactstrap';
import axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hasError: false
    };
    this.errorMsg = '';
  }

  componentDidMount() {
    document.body.classList.add('mirantis-background');
  }

  componentWillUnmount() {
    document.body.classList.remove('mirantis-background');
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    // Handle empty data
    if (!this.state.username) {
      return this.raiseError('Username is required');
    }
    if (!this.state.password) {
      return this.raiseError('Password is required');
    }
    axios.post(
      `${process.env.REACT_APP_OPERATIONS_API_URL}/api/v1/auth/login`,
      this.state, { headers: {'Content-Type': 'application/json' },
    }).then(res => {
        sessionStorage.setItem('refreshToken', res.data['refresh_token']);
        sessionStorage.setItem('authenticated', 'true');
        this.props.setAuthenticated(true);
      }).catch(err => {
        if (!err.response) {
          return this.raiseError('Operations API is not responding');
        }
        console.log(err.response);
        if (err.response.status === 401) {
          return this.raiseError('Login credentials incorrect');
        }
    });
  };

  handleTyping = (e) => {
    if (this.state.hasError) {
      this.setState({ hasError: false });
    }
    this.setState({ [e.target.name]: e.target.value })
  };

  raiseError = (msg) => {
    this.errorMsg = msg;
    this.setState({ hasError: true })
  };

  render() {
    return (
      <>
        <div className='login-container'>
          <div className='panel-header'>
            <h1>TryMCP</h1>
          </div>
          <div className='panel-body'>
            { this.state.hasError ? (
              <Alert color='danger'>
                <div>
                  <svg viewBox='0 0 24 24' preserveAspectRatio="xMidYMin slice">
                    <path
                      d='M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16'
                    />
                  </svg>
                </div>
                {this.errorMsg}</Alert>
            ) : null
            }
            <Form className='login-form' onSubmit={this.onFormSubmit}>
              <FormGroup>
                <svg
                  className='login-icon'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                >
                  <path fill='#495057'
                        d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
                  />
                </svg>
                <Input
                  placeholder='Username'
                  type='text'
                  name='username'
                  className='login-input'
                  autoComplete='username'
                  value={this.state.username}
                  onChange={this.handleTyping}
                />
              </FormGroup>
              <FormGroup>
                <svg
                  className='login-icon'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M12 17a2 2 0 1 0 .001-4.001A2 2 0 0 0 12 17m6-9c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10a2 2 0 0 1 2-2h1V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2h1m-6-5c-1.66 0-3 1.34-3 3v2h6V6c0-1.66-1.34-3-3-3z'
                    fill='#495057'/>
                </svg>
                <Input
                  placeholder='Password'
                  type='password'
                  name='password'
                  className='login-input'
                  autoComplete='current-password'
                  value={this.state.password}
                  onChange={this.handleTyping }
                />
              </FormGroup>
              <Button
                block
                color='success'
                type='submit'
              >
                Log in
              </Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default Login;
