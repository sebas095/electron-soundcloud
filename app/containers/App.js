import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Sound from 'react-sound';

import Details from '../components/Details';
import Player from '../components/Player';
import Progress from '../components/Progress';
import Search from '../components/Search';

export default class App extends Component {
  constructor() {
    super();
    this.clientId = '71776de5bf6d605d0aa67617fee3bfd6';
    this.state = {
      track: {
        stream_url: '',
        title: '',
        artwork_url: ''
      },
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: '',
      tracks: []
    };
  }

  componentDidMount() {
    this.randomTrack();
  }

  handleSongPlaying(audio) {
    this.setState({
      elapsed: this.parseMilliseconds(audio.position),
      total: this.parseMilliseconds(audio.duration),
      position: audio.position / audio.duration
    });
  }

  handleSongFinished() {
    this.randomTrack();
  }

  handleChange(ev, value) {
    this.setState({autoCompleteValue: value.newValue});
    let _this = this;
    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.clientId}&q=${value.newValue}`)
    .then((res) => {
      _this.setState({tracks: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleSelect(value, item) {
    this.setState({
      autoCompleteValue: value.item,
      track: value
    });
  }

  parseMilliseconds(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    let minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    let seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    return (
      `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
    );
  }

  formatUrl(url) {
    return `${url}?client_id=${this.clientId}`;
  }

  randomTrack() {
    let _this = this;
    Axios.get(`https://api.soundcloud.com/users/134064959/favorites?client_id=${this.clientId}`)
    .then((res) => {
      const trackLength = res.data.legth;
      const randomNumber = Math.floor((Math.random() * trackLength) + 1);
      _this.setState({track: res.data[randomNumber]});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Sound
          url={this.formatUrl(this.state.track.stream_url)}
          playStatus={this.state.playStatus}
          onPlaying={this.handleSongPlaying.bind(this)}
          playFromPosition={this.state.playFromPosition}
          onFinishedPlaying={this.handleSongFinished.bind(this)}/>
        <Search
          autoCompleteValue={this.state.autoCompleteValue}
          tracks={this.state.tracks}
          handleSelect={this.handleSelect.bind(this)}
          handleChange={this.handleChange.bind(this)}/>
        <Details />
        <Player />
        <Progress />
      </div>
    );
  }
}
