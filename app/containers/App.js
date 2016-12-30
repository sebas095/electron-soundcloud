import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Details from '../components/Details';
import Player from '../components/Player';
import Progress from '../components/Progress';
import Search from '../components/Search';

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Search />
        <Details />
        <Player />
        <Progress />
      </div>
    );
  }
}
