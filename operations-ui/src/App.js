import React, { Component } from 'react';
import Header from "./Header";
import TemplatesTable from "./TemplatesTable";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id={'content'}>
          <TemplatesTable />
        </div>
      </div>
    );
  }
}

export default App;
