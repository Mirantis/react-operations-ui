import {Table} from 'reactstrap';
import TableRow from './TableRow';
import axios from "axios";

const React = require('react');


class TemplatesTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      templates: [],
    };
  }

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
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>ID</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        { current.templates.map(template => {
           return <TableRow key={template.id} {...template}/>;
          })
        }
        </tbody>
      </Table>

    );
  }
}

export default TemplatesTable;