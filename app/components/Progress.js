import React, { Component } from 'react';

export default class Progress extends Component {
  constructor() {
    super();
  }

  render() {
    const bar = {
      maxWidth: '100%',
      width: '100%'
    };

    const label = {
      color: 'white'
    };

    return (
      <div class="ui teal progress">
        <span style={label} class="label">{this.props.elapsed}</span>
        <progress
          style={bar}
          class="bar"
          value={this.props.position}
          max="1"/>
      </div>
    );
  }
}
