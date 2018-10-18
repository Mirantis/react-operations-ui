import React, {Component} from 'react';
import {FormGroup, Label, Input, Col, Row} from 'reactstrap';
import cx from 'classnames';
import StepZilla from 'react-stepzilla';

import './ReclassModelWizard.css'

class ReclassModelWizard extends Component {
  render() {
    let activeTemplate = JSON.parse(this.props.activeTemplate);
    const steps = activeTemplate.general_params_action.map((action, index) => (
      {name: `${action.label}`, component: <Step key={`step-${index}`} stepFields={action.fields} />}));

    return (<div className='step-progress'>
        <StepZilla
          steps={steps}
          nextButtonCls={'btn btn-prev btn-info pull-right'}
          backButtonCls={'btn btn-next btn-info pull-left'}
        />
      </div>
    )
  }
}

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getFormFields = this.getFormFields.bind(this);
    this.stepFields = [];
  }

  getInput = (field) => {
    // TODO: Add validation to the IP field
    if (field.type === 'TEXT' || field.type === 'IP') {
      return (
        <Input
          name={field.name}
          id={field.name}
          placeholder={field.placeholder}
          defaultValue={field.initial}
        />
      );
    } else if (field.type === 'CHOICE') {
      return (
        <Input
          type='select'
          name={field.name}
          id={field.name}
        >
          {field.choices.map((s) => (
            <option key={s[0]} value={s[0]}>{s[1]}</option>
          ))}
        </Input>
      );
    } else if (field.type === 'LONG_TEXT') {
      return (
        <Input
          type="textarea"
          name={field.name}
          id={field.name}
          placeholder={field.placeholder}
          value={field.initial}
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
          <Label check id={field.name}>
            <Input
              defaultChecked={field.initial ? true : false}
              type='checkbox'
            />
            {field.label}
          </Label>
        </FormGroup>
      )
    }
  };

  getFormFields = (fields) => {
    return (fields.map((f) => (
      (f.type === 'BOOL') ? this.getCheckboxFormGroup(f) :
        <FormGroup
          key={f.name}
          className={cx({'d-none': f.hidden})}>
          <Label id={f.name}>
            {f.name.replace(/_/g, ' ').replace(/\b\w/g, (word) => {
              return word.toUpperCase()
            })}
          </Label>
          {this.getInput(f)}
        </FormGroup>
    )))
  };

  render() {
    return this.getFormFields(this.props.stepFields)
  }
}

export default ReclassModelWizard;

