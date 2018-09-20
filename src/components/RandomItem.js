import React, { Component } from 'react';

class RandomItem extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div style={{ display: 'inline-block', ...this.props.style }}>
       Hi i'm a fully random item.
      </div>
    );
  }
}

export default RandomItem;
