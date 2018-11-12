import React, {Component} from 'react';
import arrow from './static/img/arrow.svg'
import workflow from './static/img/workflow.svg'


class EmptyTable extends Component {
  render() {
    return (
      <div className={'empty-table-content'}>
        <div className={'empty-table-content-header'}>
          <h3>Add Cookiecutter template for SaltStack Reclass Model</h3>
          <img
            className='arrow-empty-table-content'
            src={arrow}
          />
        </div>
        <div className={'container'}>
          <img
            className='workflow-empty-table-content'
            src={workflow}
          />
        </div>
      </div>
    )
  }
}

export default EmptyTable;
