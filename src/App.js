import React, { Component } from 'react';
import './App.css';
import './templatemo-style.css';
import {Navbar} from "./components/Navbar";
import {SearchBar} from "./components/SearchBar";
import {Featured} from "./components/Featured";
import {Recipes} from "./components/Recipes";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <SearchBar/>
          <Featured/>
          <Recipes/>
      </div>
    );
  }
}

export default App;
