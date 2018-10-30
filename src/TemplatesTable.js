import React, {Component} from 'react';
import axios from "axios";
import {Table} from 'reactstrap';
import TableRow from './TableRow';
import TableManager from './TableManager';
import ReclassTemplateForm from "./ReclassTemplateForm";
import ErrorHolder from "./ErrorHolder";

require('dotenv').config();

class TemplatesTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      templates: [],
      showAddTemplateForm: false,
      keycloak: null,
      authenticated: false,
      errMessage: '',
      showError: false,
    };
    this.activeTemplate = null;
    this.requestHeader = {
      headers: {Authorization: 'Bearer ' + sessionStorage.getItem('kc_token')},
      responseType: 'json'
    };
  }

  toggleTemplateAdding = (item) => {
    if (item) {
      this.activeTemplate = item.template;
      this.setState(prevState => (
        {templates: prevState.templates.concat(item)}));
    }
    this.setState(prevState => ({
      showAddTemplateForm: !prevState.showAddTemplateForm,
    }));

  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_OPERATIONS_API_URL}/api/v1/modelform/templates`, this.requestHeader)
      .then(
        res => {
          const templates = res.data;
          this.setState({templates});
        })
      .catch(
        error => {
          console.log(error.response);
          this.setState({errMessage: error.message});
          this.setState({showError: true});
        }
      );
  }

  removeTemplate = (tId) => {
    axios.delete(`${process.env.REACT_APP_OPERATIONS_API_URL}/api/v1/modelform/templates/` + tId, this.requestHeader)
      .then(res => {
        return this.setState(prevState => (
          { templates: prevState.templates.filter((obj => (obj.id !== tId))) })
        )
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  render() {
    const current = this.state;

    return (
      current.showError ? (
              <tr>
                <td colSpan='3'>
                  <ErrorHolder
                    errorName={'Operations API unavailable'}
                    errorDetails={this.state.errMessage}
                  />
                </td>
              </tr>
            ) : (
      current.showAddTemplateForm ? (
        //<ReclassModelWizard
        <ReclassTemplateForm
          activeTemplate={this.activeTemplate}
          toggleTemplateAdding={() => this.toggleTemplateAdding(null)}
        />
      ) : (
        <div className={'table-content'}>
          <TableManager
            toggleTemplateAdding={this.toggleTemplateAdding}
            requestHeader={this.requestHeader}
          />
          <Table
            striped
            bordered
            hover
          >
            <thead>
            <tr>
              <th>ID</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            {current.templates.map((item) => (
                <TableRow
                  key={item.id}
                  id={item.id}
                  createdAt={item.created_at}
                  template={item.template}
                  removeTemplate={() => this.removeTemplate(item.id)}
                />
              )
            )}
            </tbody>
          </Table>
        </div>
      ))
    );
  }
}

export default TemplatesTable;