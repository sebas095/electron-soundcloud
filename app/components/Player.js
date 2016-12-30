import React, { Component } from 'react';
import classNames from 'classnames';

export default class Player extends Component {
  constructor() {
    super();
  }

  render() {
    const playerStatus = classNames({
      'fa fa-play': this.props.playerStatus === 'PLAYING' ? false : true,
      'fa fa-pause': this.props.playerStatus === 'PLAYING' ? true : false,
    });

    return (
      <div>
        <button onClick={this.props.backward}>
          <i class="fa fa-backward"></i>
        </button>
        <button onClick={this.props.togglePlay}>
          <i class={playerStatus}></i>
        </button>
        <button onClick={this.props.stop}>
          <i class="fa fa-stop"></i>
        </button>
        <button onClick={this.props.random}>
          <i class="fa fa-random"></i>
        </button>
        <button onClick={this.props.forward}>
          <i class="fa fa-forward"></i>
        </button>
      </div>
    );
  }
}
