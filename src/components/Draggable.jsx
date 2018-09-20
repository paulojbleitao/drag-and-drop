import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './Draggable.css';

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: 'default',
      clickStarted: false,
      clickLocation: {
        X: null,
        Y: null
      },
      elementPosition: {
        X: null,
        Y: null
      }
    }

    this.fakeState = { currentPosition: { x: 0, y: 0 } }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    const { screenX, screenY } = event;
    const { dragX, dragY } = this.updatePosition(screenX, screenY);

    this.setState({ elementPosition: { X: dragX, Y: dragY } });
  }


  handleMouseDown(e) {
    let dragX = 0;
    let dragY = 0;

    this.setState({
      clickStarted: true,
      clickLocation: {
        X: e.screenX,
        Y: e.screenY
      },
      positionWhenClicked: {
        X: this.fakeState.currentPosition.x,
        Y: this.fakeState.currentPosition.y
      }
    })
  }

  handleMouseUp(e) {
    this.setState({ clickStarted: false })
  }

  updatePosition(mouseX, mouseY) {
    const elementPositionX = this.fakeState.currentPosition.x;
    const elementPositionY = this.fakeState.currentPosition.y;

    let dragX = elementPositionX;
    let dragY = elementPositionY;

    if (this.state.clickStarted) {
      const relativeXdistance = (this.state.clickLocation.X - this.state.positionWhenClicked.X)
      const relativeYdistance = (this.state.clickLocation.Y - this.state.positionWhenClicked.Y)

      dragX = mouseX - relativeXdistance;
      dragY = mouseY - relativeYdistance;
    }

    return { dragX, dragY };
  }

  render() {
    const Element = this.props.item;
    const { mouseX, mouseY } = this.props;
    const { X, Y } = this.state.elementPosition;
    const state = this.state;

    return (
      <div
        className="draggable-container"
        style={{ cursor: state.cursor, top: state.elementPosition.Y, left: state.elementPosition.X }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <Element {...Element.props} ref={el => {
            const node = ReactDOM.findDOMNode(el);
            if (node) {
              const currentPosition = node.getBoundingClientRect();
              this.fakeState = { currentPosition }
            }

          } } />
      </div>
    );
  }
}

export default Draggable;
