import React, { Component } from 'react';
import logo from './static/img/logo.png'

class NavigationBar extends Component {
  render() {
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>

          <div className='navbar-header'>

              <img
                className='mirantis-logo'
                src={logo}
                alt='Mirantis'
              />

            <h1>TryMCP</h1>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            {/* dropdown menu will be here*/}
          </div>

      </nav>
    );
  }
}
export default NavigationBar;
