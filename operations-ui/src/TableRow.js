import React, {Component} from 'react';
import {Button} from 'reactstrap';


class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.created_at = '';
      this.id = null;
      this.template = null;
    }

  userLocale = (utc_time) => {

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    utc_time = new Date(utc_time);
    let trailingZero = (number) => number < 10 ? '0' + number : number;
    return (
      `${months[utc_time.getMonth()]} ` +
      `${utc_time.getDate()}, ` +
      `${utc_time.getFullYear()}, ` +
      `${utc_time.getHours()}:` +
      `${trailingZero(utc_time.getMinutes())}:` +
      `${trailingZero(utc_time.getSeconds())}`
    );
  };

  render() {
    let created = this.props.created_at;
    return (
      <tr>
        <td>{this.props.id}</td>
        {/*TODO: transform to user local data*/}
        <td>{this.userLocale(created)}</td>
        <td>
          <Button
            outline
            color="secondary"
            onClick={this.props.toggleShowWizard}
          >
            {'Generate Params'}
          </Button>
        </td>
      </tr>
    )
  }
}

export default TableRow;
