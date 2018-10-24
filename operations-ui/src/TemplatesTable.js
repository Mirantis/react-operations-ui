import React, {Component} from 'react';
import axios from "axios";
import {Table} from 'reactstrap';
import ReclassModelWizard from './ReclassModelWizard';
import TableRow from './TableRow';
import TableManager from './TableManager';


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
  }

  toggleShowWizard = (t) => {
    this.activeTemplate = t;
    this.setState(prevState => ({
      showWizard: !prevState.showWizard,
    }));
  };

  componentDidMount() {
    const authStr = 'Bearer '.concat(sessionStorage.getItem('kc_token'));
    axios.get('http://localhost:8001/api/v1/modelform/templates',
      {
        headers: {Authorization: authStr},
        responseType: 'json'
      })
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

  render() {
    const current = this.state;

    return (
      current.showWizard ?

        <ReclassModelWizard
          activeTemplate={this.activeTemplate}
          toggleShowWizard={() => this.toggleShowWizard(null)}
        /> :
        <div className={'table-content'}>
          <TableManager addTemplate={this.addTemplate}/>
          <Table striped bordered hover>
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
                  created_at={item.created_at}
                  template={item.template}
                  toggleShowWizard={() => this.toggleShowWizard(item.template)}/>
              )
            )}
            </tbody>
          </Table>
        </div>
    );
  }
}

export default TemplatesTable;