import React, {Component} from 'react';
import {Form, Button} from 'reactstrap';
import FieldList from './FieldList'
import axios from "axios";

const ReactDOM = require('react-dom');

class ReclassTemplateForm extends Component {

  submitFormData = () => {
    let inputValues = {};

    Object.keys(this.refs).forEach((inputName) => {
      let inputElement = ReactDOM.findDOMNode(this.refs[inputName]);
      if (inputElement.type === 'checkbox') {
        inputValues[inputName] = inputElement.checked;
      } else {
        inputValues[inputName] = inputElement.value.trim();
      }
    });
    console.log(inputValues);
    // axios.post('http://localhost:8001/api/v1/metadata/submit', this.wizardStorage)
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   });
    this.props.toggleShowWizard(null)
  };


  render() {
    const activeTemplate = JSON.parse(this.props.activeTemplate);
  let fields = activeTemplate.general_params_action[0].fields;
    return (
      <Form>
        <FieldList fields={fields}/>
        <Button
          className={'wizard-submit'}
          color='success'
          type='submit'
          size='lg'
          onClick={this.props.submitFormData}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

export default ReclassTemplateForm;
