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

  render() {
    return (
      <>
        <div className='login panel'>
          <div className='panel-header'>
          </div>
          <div className='panel-header'>
            <Form className='template-form'>
              <FormGroup>
                <Label for='username'>Username</Label>
                <Input
                  type='text'
                  name='username'
                  id='username'
                />
              </FormGroup>
              <FormGroup>
                <Label for='loginPassword'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='loginPassword'
                />
              </FormGroup>
              <Button
                className={'wizard-submit'}
                color='success'
                type='submit'
                size='lg'
                onClick={this.submitFormData}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
    </>
        )
        }
        }

        export default Login;