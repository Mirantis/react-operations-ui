import React, {Component} from 'react';
import {Form, Button} from 'reactstrap';
import FieldList from './FieldList'
import axios from "axios";

const ReactDOM = require('react-dom');

class ReclassTemplateForm extends Component {
  constructor(props) {
    super(props);
    this.inputDataRefs = {};
  }

  submitFormData = () => {
    let inputValues = {};

    Object.keys(this.inputDataRefs).forEach((inputName) => {
      let inputElement = ReactDOM.findDOMNode(this.inputDataRefs[inputName]);
      if (inputElement.type === 'checkbox') {
        inputValues[inputName] = inputElement.checked;
      } else {
        inputValues[inputName] = inputElement.value.trim();
      }
    });
    console.log(inputValues);
    axios.post(`${process.env.REACT_APP_OPERATIONS_API_URL}/api/v1/modelform/submit`, {
      headers: {'Content-Type': 'application/json'},
      data: this.wizardStorage
    }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.response);
    });
    this.props.toggleTemplateAdding(null)
  };

  getRefsFromChild = (fieldListRefs) => {
    if (this.inputDataRefs) {
      Object.assign(this.inputDataRefs, fieldListRefs)
    } else {
      this.inputDataRefs = fieldListRefs
    }
  };

  render() {
    const activeTemplate = JSON.parse(this.props.activeTemplate);
    let fields = activeTemplate.general_params_action[0].fields;
    return (
        <Form className='template-form'>
          <FieldList
            fields={fields}
            passInputData={this.getRefsFromChild}
          />
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
    )
  }
}

export default ReclassTemplateForm;
