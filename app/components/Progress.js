import React, { Component } from 'react';

export default class Progress extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <span>Max Time</span>
        <progress max="1"/>
      </div>
    );
  }
}
