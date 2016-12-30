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

  formatUrl(url) {
    return `${url}?client_id=${this.clientId}`;
  }

  togglePlay() {
    if (this.state.playStatus === Sound.status.PLAYING) {
      this.setState({playStatus: Sound.status.PAUSE});
    } else {
      this.setState({playStatus: Sound.status.PLAYING});
    }
  }

  stop() {
    this.setState({playStatus: Sound.status.STOPPED});
  }

  forward() {
    this.setState({playFromPosition: this.state.playFromPosition += 10000});
  }

  backward() {
    this.setState({playFromPosition: this.state.playFromPosition -= 10000});
  }

  parseImage(url) {
    return url.replace(/large/, 't500x500');
  }

  render() {
    const playStyle = {
      width: "100vw",
      height: "100vh",
      padding: "20%",
      paddingTop: "5%",
      color: "white",
      backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ), url(${this.parseImage(this.state.track.artwork_url)})`,
      backgroundSize: 'cover'
    };

    return (
      <div style={playStyle} class="ui fluid container">
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
        <Details
          title={this.state.track.title}/>
        <Player
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          forward={this.forward.bind(this)}
          backward={this.backward.bind(this)}
          random={this.randomTrack.bind(this)}
          playerStatus={this.state.playStatus}/>
        <Progress
          elapsed={this.state.elapsed}
          position={this.state.position}/>
      </div>
    );
  }
}
