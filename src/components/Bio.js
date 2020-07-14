import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';
import './Bio.css';
import Homage from '../assets/music/Homage.mp3';
import { createLanguageLink } from '../utils/i18n';

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      play: false,
    };
  }
  handleClick() {
    console.log(this.state.play);
    if (this.state.play) {
      this.player.pause();
    } else {
      this.player.play();
    }
    this.setState({
      play: !this.state.play,
    });
  }
  componentDidMount() {
    const playTime = window.localStorage.getItem('playTime');
    setTimeout(() => {
      if(this.player.paused === false) {
        this.setState({
          play: true
        })
      }
    }, 1000)
    if (playTime) {
      this.player.currentTime = playTime;
    } else {
      this.player.currentTime = 0;
    }
  }

  componentWillUnmount() {
    window.localStorage.setItem('playTime', this.player.currentTime);
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'center',
          // marginBottom: rhythm(2),
        }}
      >
        <audio
          ref={ref => (this.player = ref)}
          src={Homage}
          autoPlay
          preload="auto"
        ></audio>
        <img
          src={profilePic}
          alt={`Jason Zhour`}
          className={`${this.state.play ? 'active' : 'paused'} spin`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
          onClick={this.handleClick}
        />
        <span style={{ maxWidth: 310, fontFamily: 'CustomFont' }}>
          嗨, 我是 Jason, 一个努力抗压的前端 BOY！
        </span>
      </div>
    );
  }
}

export default Bio;
