import React, {Component} from 'react';
import {Button} from 'reactstrap';
import StepZilla from 'react-stepzilla';
import axios from "axios";
import FieldList from "./FieldList";

const ReactDOM = require('react-dom');

class ReclassModelWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.wizardStorage = {};
  }

  submitWizardData = () => {
    console.log(this.wizardStorage);
    axios.post('http://localhost:8001/api/v1/metadata/submit', this.wizardStorage)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    this.props.toggleShowWizard(null)
  };

  getStore() {
    return this.wizardStorage;
  }

  updateStore(newValues) {
    this.wizardStorage = {
      ...this.wizardStorage,
      ...newValues,
    }
  }

  render() {
    let activeTemplate = JSON.parse(this.props.activeTemplate);
    const steps = activeTemplate.general_params_action.map((action, index) => (
      {
        name: `${action.label}`,
        component:
          <Step
            key={`step-${index}`}
            stepFields={action.fields}
            getStore={() => (this.getStore())}
            updateStore={(u) => {
              this.updateStore(u)
            }}
          />
      }));
    steps.push({name: 'Submit', component: <LastStep submitWizardData={() => this.submitWizardData()} key={'dummy'}/>});
    return (<div className='step-progress'>
        <StepZilla
          steps={steps}
          stepsNavigation={false}
          nextButtonCls={'btn btn-prev btn-outline-primary pull-right outline'}
          backButtonCls={'btn btn-next btn-outline-primary pull-left'}
          preventEnterSubmission={true}
        />
      </div>
    )
  }
}

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stepFields = [];
    this.inputDataRefs = {};
    this.isValidated = this.isValidated.bind(this);
  }

  getRefsFromChild = (fieldListRefs) => {
    if (this.inputDataRefs) {
      Object.assign(this.inputDataRefs, fieldListRefs)
    } else {
      this.inputDataRefs = fieldListRefs
    }
  };

  isValidated = () => {
    // TODO: Add real validation here

    const userInput = this._grabUserInput();
    this.props.updateStore({...userInput});

    return true;
  };

  _grabUserInput = () => {
    let inputValues = {};

    Object.keys(this.inputDataRefs).forEach((inputName) => {
      let inputElement = ReactDOM.findDOMNode(this.inputDataRefs[inputName]);
      if (inputElement.type === 'checkbox') {
        inputValues[inputName] = inputElement.checked;
      } else {
        inputValues[inputName] = inputElement.value.trim();
      }
    });
    return inputValues;
  };

  render() {
    let fields = this.props.stepFields;
    return <FieldList
      fields={fields}
      passInputData={this.getRefsFromChild}
    />
  }
}

class LastStep extends Component {
  render() {
    return (
      <div className={'last-step-text'}>
        <p> Now you can start model generation </p>
        <Button
          className={'wizard-submit'}
          color='success'
          type='submit'
          size='lg'
          onClick={this.props.submitWizardData}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default ReclassModelWizard;

