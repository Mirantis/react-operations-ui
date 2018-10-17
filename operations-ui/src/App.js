import React, { Component } from 'react';
import Header from "./Header";
import TemplatesTable from "./TemplatesTable";

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <TemplatesTable />
      </div>
    );
  }
}

export default App;
