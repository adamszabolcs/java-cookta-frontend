import React, { Component } from 'react';
import './App.css';
import {FilterBar} from "./components/FilterBar";
import {Navbar} from "./components/Navbar";
import {SearchBar} from "./components/SearchBar";
import {Featured} from "./components/Featured";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <SearchBar/>
          <FilterBar/>
          <Featured/>
      </div>
    );
  }
}

export default App;
