import React, {Component} from "react";
import {Input, Col, Row, FormGroup, Label} from 'reactstrap';
import HelpIcon from "./HelpIcon";
import cx from "classnames";


class FieldList extends Component {
  componentDidMount() {
    // pass the requested ref here
    // TODO: Do not use string refs
    this.props.passInputData(this.refs);
  }

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

  };

  getFormGropsRow = (currentField, nextField) => {
    return (
      <Row
        key={currentField.name}
        form
      >
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
    return f.type === 'BOOL' ? (
      this.getCheckboxFormGroup(f)
    ) : (
      <FormGroup
        key={f.name}
        className={cx({'d-none': f.hidden})}>
        <Label for={f.name}>
          {f.name.replace(/_/g, ' ').replace(/\b\w/g, (word) => {
            return word.toUpperCase()
          })}
          <HelpIcon text={f.help_text}/>
        </Label>
        {this.getInputField(f)}
      </FormGroup>
    )
  };

  render() {
    const fields = this.props.fields;

    let newRow = true;

    const formFields = fields.map((f, i) => {
      if (f.width === 'half') {
        if (newRow) {
          newRow = false;
          return this.getFormGropsRow(f, fields[i + 1]);
        } else {
          newRow = true;
          return null;
        }
      }
      return this.getBaseFormGroup(f);
    });

    return formFields;
  }
}

export default FieldList;
