import React, {Component} from 'react';
import {Button} from 'reactstrap';


class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.createdAt = '';
      this.id = null;
      this.template = null;
    }

  userLocale = (utcTime) => {
    utcTime = new Date(utcTime);
    return utcTime.toString().split(' ').slice(1, -4).join(' ');
  };

  render() {
    let created = this.props.createdAt;
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.userLocale(created)}</td>
        <td>
          <svg
            className='clickable delete-icon'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            onClick={this.props.removeTemplate}
          >
            <path d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' />
          </svg>
        </td>
      </tr>
    )
  }
}

export default TableRow;
