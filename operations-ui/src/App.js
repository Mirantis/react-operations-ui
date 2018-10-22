import React, { Component } from 'react';
import NavigationBar from "./NavigationBar";
import TemplatesTable from "./TemplatesTable";

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div id={'content'}>
          <TemplatesTable />
        </div>
      </div>
    );
  }
}

export default App;
