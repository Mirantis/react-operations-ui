import React, {Component} from 'react';
import axios from "axios";
import {Table} from 'reactstrap';
import ReclassModelWizard from './ReclassModelWizard';
import TableRow from './TableRow';
import TableManager from './TableManager';

require('dotenv').config();

class TemplatesTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      templates: [],
      showWizard: false,
      keycloak: null,
      authenticated: false,
    };
    this.activeTemplate = null;
    this.requestHeader = {
      headers: {Authorization: 'Bearer ' + sessionStorage.getItem('kc_token')},
      responseType: 'json'
    };
  }

  toggleShowWizard = (t) => {
    this.activeTemplate = t;
    this.setState(prevState => ({
      showWizard: !prevState.showWizard,
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
          console.log(error.response)
        }
      );
  }

  addTemplate = (t) => {
    return this.setState(prevState => (
      { templates: prevState.templates.concat(t) }));
  };

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
      current.showWizard ? (
        <ReclassModelWizard
          activeTemplate={this.activeTemplate}
          toggleShowWizard={() => this.toggleShowWizard(null)}
        />
        ) : (
        <div className={'table-content'}>
          <TableManager
            addTemplate={this.addTemplate}
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
                  toggleShowWizard={() => this.toggleShowWizard(item.template)}
                  removeTemplate={() => this.removeTemplate(item.id)}
                />
            ))}
            </tbody>
          </Table>
        </div>
      )
    );
  }
}

export default TemplatesTable;