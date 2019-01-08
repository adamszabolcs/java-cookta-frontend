import React, { Component } from 'react';
import './App.css';
import {FilterBar} from "./components/FilterBar";

class App extends Component {
  render() {
    return (
      <div className="App">
          <FilterBar/>
      </div>
    );
  }
}

export default App;
