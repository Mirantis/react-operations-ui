import axios from 'axios';

const ReactDataGrid = require('react-data-grid');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
    ];

    this.state = {
      templates: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8001/api/v1/modelform/template',  {responseType: 'json'})
      .then(res => {
        const templates = res.data;
        this.setState({ templates });
      });
  }

  createRows = (currentTempates) => {
    let rows = [];

    currentTempates.forEach(function(t) {
      rows.push({
        id: t.id,
        title: t.template,
      });
    });

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    const currentTempates = this.state;
    this.createRows(currentTempates.templates);
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} />);
  }
}

export default Example;