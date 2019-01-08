import React, { Component } from 'react';
import './App.css';
import {FilterBar} from "./components/FilterBar";
import {Navbar} from "./components/Navbar";
import {SearchBar} from "./components/SearchBar";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <SearchBar/>
          <FilterBar/>
      </div>
    );
  }
}

export default App;
