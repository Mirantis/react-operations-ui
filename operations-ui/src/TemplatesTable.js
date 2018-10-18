import React, {Component} from 'react';
import {Table} from 'reactstrap';
import TableRow from './TableRow';
import ReclassModelWizard from './ReclassModelWizard';
import axios from "axios";

class TemplatesTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      templates: [],
      showWizard: false
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
    axios.get('http://localhost:8001/api/v1/modelform/templates', {responseType: 'json'})
      .then(res => {
        const templates = res.data;
        this.setState({templates});
      });
  }

  render() {
    const current = this.state;

    return (
      current.showWizard ? <ReclassModelWizard activeTemplate={this.activeTemplate}/> :
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
    );
  }
}

export default TemplatesTable;