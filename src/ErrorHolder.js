import React, {Component} from 'react';
import {Alert} from 'reactstrap';


class ErrorHolder extends Component {

  render() {
    return (
      <div className='alert-holder'>
        <Alert color='danger'>
          <h4 className='alert-heading'>{this.props.errorName}</h4>
          <p>
           {this.props.errorDetails}
          </p>
        </Alert>
      </div>
    );
  }
}


export default ErrorHolder;