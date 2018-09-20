import React, { Component } from 'react';
import './App.css';

import RandomItem from './components/RandomItem'
import Draggable from './components/Draggable'

class ExampleBox extends Component {
  constructor() {
    super()

    this.state = { mouseX: null, mouseY: null };

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(e) {
    this.setState({ mouseX: e.screenX, mouseY: e.screenY });
  }

  render() {
    const { mouseX, mouseY } = this.state;
    return (
      <div onMouseMove={this.handleMouseMove}
           style={{ margin:  '20vh 20vw' }} className="Example-box">
        <RandomItem style={{backgroundColor: 'cyan'}} />
        <Draggable item={RandomItem} mouseX={mouseX} mouseY={mouseY} />
      </div>
    );
  }
}

export default ExampleBox;
