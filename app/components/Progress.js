import React, { Component } from 'react';

export default class Progress extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <span>{this.props.elapsed}</span>
        <progress
          value={this.props.position}
          max="1"/>
      </div>
    );
  }
}
