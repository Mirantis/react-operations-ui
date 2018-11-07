import React, {Component} from 'react';
import {Form, Button, Input, FormGroup, Label} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    document.body.classList.add('mirantis-background');
  }

  componentWillUnmount() {
    document.body.classList.remove('mirantis-background');
  }

  render() {
    return (
      <>
        <div className='login-container'>
          <div className='panel-header'>
            <h1>TryMCP</h1>
          </div>
          <div className='panel-body'>
            <Form className='login-form'>
              <FormGroup>
                <svg
                  className='login-icon'
                  width='18'
                  height='18'
                  viewBox="0 0 24 24"
                >
                  <path fill="#495057"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
                <Input
                  placeholder='Username'
                  type='text'
                  name='username'
                  className='login-input'
                ></Input>
              </FormGroup>
              <FormGroup>
                <svg
                  className='login-icon'
                  width='18'
                  height='18'
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17a2 2 0 1 0 .001-4.001A2 2 0 0 0 12 17m6-9c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10a2 2 0 0 1 2-2h1V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2h1m-6-5c-1.66 0-3 1.34-3 3v2h6V6c0-1.66-1.34-3-3-3z"
                    fill="#495057"/>
                </svg>
                <Input
                  placeholder='Password'
                  type='password'
                  name='password'
                  className='login-input'
                />
              </FormGroup>
              <Button
                block
                color='login'
                type='submit'
                onClick={this.submitFormData}
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