import React, {Component} from 'react';
import {FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import cx from 'classnames';
import StepZilla from 'react-stepzilla';
import HelpIcon from './HelpIcon'
import axios from "axios";

const ReactDOM = require('react-dom');

class ReclassModelWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.wizardStorage = {};
  }

  submitWizardData = () => {
    console.log(this.wizardStorage);
    let filledTemplate = JSON.stringify(this.wizardStorage);
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

    this.isValidated = this.isValidated.bind(this);
  }

  isValidated = () => {
    // TODO: Add real validation here

    const userInput = this._grabUserInput();
    this.props.updateStore({...userInput});

    return true;
  };

  _grabUserInput = () => {
    let inputValues = {};

    Object.keys(this.refs).forEach((inputName) => {
      let inputElement = ReactDOM.findDOMNode(this.refs[inputName]);
      if (inputElement.type === 'checkbox') {
        inputValues[inputName] = inputElement.checked;
      } else {
        inputValues[inputName] = inputElement.value.trim();
      }
    });
    return inputValues;
  };

  getInputField = (field) => {
    let commonParams = {
      name: `${field.name}`,
      id: `${field.name}`,
      ref: `${field.name}`,
      bsSize: 'sm'

    };

    if (`${field.placeholder}` !== 'undefined') {
      commonParams.placeholder = `${field.placeholder}`
    }
    // TODO: Add validation to the IP field
    if (field.type === 'TEXT' || field.type === 'IP') {
      return (
        <Input
          {...commonParams}
          defaultValue={field.initial}
        />
      );
    } else if (field.type === 'CHOICE') {
      return (
        <Input
          {...commonParams}
          type='select'
        >
          {field.choices.map((s) => (
            <option key={s[0]} value={s[0]}>{s[1]}</option>
          ))}
        </Input>
      );
    } else if (field.type === 'LONG_TEXT') {
      return (
        <Input
          {...commonParams}
          type="textarea"
          defaultValue={field.initial}
        />
      );
    }
  };

  getCheckboxFormGroup = (field) => {
    // There are no such fields at mm.mcp.mirantis.net
    if (field.label) {
      return (
        <FormGroup
          check
          key={field.name}
          className={cx({'d-none': field.hidden})}
        >
          <Input
            defaultChecked={!!field.initial}
            type='checkbox'
            id={field.name}
            ref={field.name}
          />
          <Label check for={field.name}>
            {field.name.replace(/_/g, ' ').replace(/\b\w/g, (word) => {
              return word.toUpperCase()
            })}
          </Label>
        </FormGroup>
      )
    }
  };

  getFormGropsRow = (currentField, nextField) => {
    return(
      <Row form>
        <Col md={6}>
          {this.getBaseFormGroup(currentField)}
        </Col>
        <Col md={6}>
          {this.getBaseFormGroup(nextField)}
        </Col>
      </Row>
    )
  };

  getBaseFormGroup = (f) => {
    return f.type === 'BOOL' ? this.getCheckboxFormGroup(f) : (
      <FormGroup
        key={f.name}
        className={cx({'d-none': f.hidden})}>
        <Label for={f.name}>
          {f.name.replace(/_/g, ' ').replace(/\b\w/g, (word) => {
            return word.toUpperCase()
          })}
          <HelpIcon text={f.help_text}></HelpIcon>
        </Label>
        {this.getInputField(f)}
      </FormGroup>
    )
  };

  render() {
    let fields = this.props.stepFields;
    let newRow = true;
    return fields.map((f, i) => {
      if (f.width === 'half') {
        if (newRow) {
          newRow = false;
          return this.getFormGropsRow(f, fields[i + 1]);
        } else {
          newRow = true;
        }
      } else {
        return this.getBaseFormGroup(f);
      }
    });
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

