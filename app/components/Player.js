import React, { Component } from 'react';

export default class Player extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>Backward</div>
        <div>Play | Pause</div>
        <div>Stop</div>
        <div>Forward</div>
        <div>Random</div>
      </div>
    );
  }
}
