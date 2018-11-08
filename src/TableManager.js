import {Component} from "react";
import {Button} from "reactstrap";
import React from "react";
import AxiosInstance from './AxiosInstance'

class TableManager extends Component {

  addTemplate = () => {
    AxiosInstance.post('modelform/templates')
      .then(res => {
        return this.props.toggleTemplateAdding(res.data);
      })
      .catch(error => {
        console.log(error.response);
        return this.props.toggleTemplateAdding(null);
      });
  };

  render() {
    return (
      <div className={'page-header'}>
        <h2>
          Reclass Model Templates
        </h2>
        <Button
          color='primary'
          onClick={this.addTemplate}
        >
          {'Add Template'}
        </Button>
      </div>
    )
  }
}

export default TableManager;