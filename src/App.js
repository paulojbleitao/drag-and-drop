import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ExampleBox from './ExampleBox'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header><h2><em>This is a Drag and Drop Example</em></h2></header>
        <ExampleBox />
      </div>
    );
  }
}

export default App;
