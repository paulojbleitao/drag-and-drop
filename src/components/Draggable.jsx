import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './Draggable.css';

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: 'default',
      clickStarted: false,
      clickXlocation: null,
      clickYlocation: null,
      elementPosition: {
        X: null,
        Y: null
      }
    }

    this.fakeState = { rect: { x: 300, y: 300 } }

    this.onMouseClick = this.onMouseClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    const { mouseX, mouseY } = nextProps;
    const { dragX, dragY } = this.updatePosition(mouseX, mouseY);
    this.setState({ elementPosition: { X: dragX, Y: dragY } });
  }

  onMouseClick(e) {
    // console.log(this.state.node.getBoundingClientRect());
    console.log(e.screenX, e.screenY, this.state);
    // console.log(this.getBoundingClientRect());

  }

  onMouseDown(e) {
    let dragX = 0;
    let dragY = 0;

    console.log(e.screenX, e.screenY);
    this.setState({ clickStarted: true, clickXlocation: e.screenX, clickYlocation: e.screenY })
  }

  onMouseUp(e) {
    this.setState({ clickStarted: false })
  }

  updatePosition(mouseX, mouseY) {
    let dragX = 0;
    let dragY = 0;
    const initialX = this.fakeState.rect.x;
    const initialY = this.fakeState.rect.y;
    console.log('initial', initialX, initialY);
    console.log('clickX', this.state.clickXlocation);
    console.log('mouse', mouseX, mouseY)

    if (this.state.clickStarted) {
      dragX = initialX + (-this.state.clickXlocation + mouseX);
      dragY = initialY + (-this.state.clickYlocation + mouseY);
      console.log('if', dragX, dragY);
    } else {
      dragX = this.fakeState.rect.x;
      dragY = this.fakeState.rect.y;
      console.log('else', dragX, dragY);
    }

    console.log(this.state);
    // this.setState({ elementPosition: { X: dragX, Y: dragY} });
    return { dragX, dragY };
  }

  render() {
    const Element = this.props.item;
    const { mouseX, mouseY } = this.props;
    const state = this.state;

    return (
      <div
        className="draggable-container"
        style={{ cursor: state.cursor, top: state.elementPosition.Y, left: state.elementPosition.X }}
        onClick={this.onMouseClick}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <Element {...Element.props} ref={ el => {
            const node = ReactDOM.findDOMNode(el);
            if (node) {
              const rect = node.getBoundingClientRect();
              this.fakeState = { rect }
              // console.log(rect);
            }

          } } />
      </div>
    );
  }
}

export default Draggable;
