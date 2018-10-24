import {Component} from "react";
import axios from "axios";
import {Button} from "reactstrap";
import React from "react";


class TableManager extends Component {

  addTemplate = () => {
    const authStr = 'Bearer '.concat(sessionStorage.getItem('kc_token'));
    axios.post('http://localhost:8001/api/v1/modelform/templates',
      {
        headers: {Authorization: authStr},
        responseType: 'json'
      })
      .then(
        res => {
          return this.props.addTemplate(res.data);
        })
      .catch(
        error => {
          console.log(error.response)
        }
      );
  };

  render() {
    return (
      <div className={'page-header'}>
        <h2>
          Templates Table
        </h2>
        <Button
          color='success'
          onClick={this.addTemplate}
        >
          Add Template
        </Button>
      </div>
    )
  }
}

export default TableManager;