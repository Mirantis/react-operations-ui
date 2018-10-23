import React, { Component } from "react";
import logo from './static/img/logo.png' // relative path to image

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">

          <div className="navbar-header">

              <img
                className="mirantis-logo"
                src={logo}
                alt="Mirantis"
              />

            <h1>Reclass Model Form Generator</h1>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {/* dropdown menu will be here*/}
          </div>

      </nav>
    );
  }
}
export default NavigationBar;
