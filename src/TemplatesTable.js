import React, {Component} from 'react';
import {Table} from 'reactstrap';
import AxiosInstance from './AxiosInstance'
import TableRow from './TableRow';
import TableManager from './TableManager';
import ReclassTemplateForm from "./ReclassTemplateForm";
import ErrorHolder from "./ErrorHolder";


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
    this._isMounted = false
  }

  toggleTemplateAdding = (item) => {
    if (item) {
      this.activeTemplate = item.template;
      this.setState(prevState => (
        {templates: prevState.templates.concat(item)}));
      this.setState(prevState => ({
      showAddTemplateForm: !prevState.showAddTemplateForm,
    }));
    } else {
       this.setState( { showAddTemplateForm: false });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    AxiosInstance.get('modelform/templates')
      .then(
        res => {
          const templates = res.data;
          if (this._isMounted) {
            this.setState({ templates });
          }
        })
      .catch(
        error => {
          if (this._isMounted) {
            this.setState({errMessage: error.message});
            this.setState({showError: true});
          }
        }
      );
  }

  componentWillUnmount(){
   this._isMounted = false;
  }

  removeTemplate = (tId) => {
    AxiosInstance.delete('modelform/templates/' + tId)
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
        <ErrorHolder
          errorName={'Operations API unavailable'}
          errorDetails={this.state.errMessage}
        />
      ) : (
      current.showAddTemplateForm ? (
        //<ReclassModelWizard
        <ReclassTemplateForm
          activeTemplate={this.activeTemplate}
          toggleTemplateAdding={() => this.toggleTemplateAdding(null)}
        />
      ) : (
        <div className={'table-content'}>
          <TableManager toggleTemplateAdding={this.toggleTemplateAdding}/>
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