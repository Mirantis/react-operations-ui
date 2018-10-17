import React, { Component } from 'react';
import Header from "./Header";
import TemplatesTable from "./TemplatesTable";
import ReclassModelWizard from "./ReclassModelWizard";


import './App.css';


class App extends Component {
  render() {
    return (

      <div>

        <Header />
        {/*<ReclassModelWizard />*/}
        <TemplatesTable />
      </div>


    );
  }
}

export default App;
