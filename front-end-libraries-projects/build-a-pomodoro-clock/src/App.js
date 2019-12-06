import React from 'react';
import './App.css';
import harpStrumming from './harp-strumming.mp3';

const PLAY = '\u25B6';
const PAUSE= 'II';
const RESET = '\u21BA';

function Interactive(props) {
  return (
    <div className="interactive-container">
      <p id={`${props.type}-label`}>{`${props.type} length`}</p>
      <div className="flex">
        <p id={`${props.type}-decrement`} className="click" onClick={props.handleDecrementIncrement}>&darr;</p>
        <p id={`${props.type}-length`}>{props.length}</p>
        <p id={`${props.type}-increment`} className="click" onClick={props.handleDecrementIncrement}>&uarr;</p>
      </div>
    </div>
  );
}

function Timer(props) {
  return (
    <div className="timer-container">
      <p id="timer-label">{props.type}</p>
      <p id="time-left">{props.timer}</p>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      type: 'session',
      timer: '25:00',
      timerId: 0,
      paused: true
    };
    this.handleDecrementIncrement = this.handleDecrementIncrement.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.timerFunction = this.timerFunction.bind(this);
  }

  handleDecrementIncrement(event) {
    if (!this.state.paused) return;
    let id = event.target.id;
    let breakLength;
    let sessionLength;
    switch(id) {
      case 'break-decrement':
        breakLength = Math.max(1, this.state.breakLength - 1);
        this.setState({
          breakLength,
          timer: (this.state.type === 'break') ? `${breakLength}:00` : this.state.timer
        });
        break;
      case 'break-increment':
        breakLength = Math.min(60, this.state.breakLength + 1);
        this.setState({
          breakLength,
          timer: (this.state.type === 'break') ? `${breakLength}:00`: this.state.timer
        });
        break;
      case 'session-decrement':
        sessionLength = Math.max(1, this.state.sessionLength - 1);
        this.setState({
          sessionLength,
          timer: (this.state.type === 'session') ? `${sessionLength}:00` : this.state.timer
        });
        break;
      case 'session-increment':
        sessionLength = Math.min(60, this.state.sessionLength + 1);
        this.setState({
          sessionLength,
          timer: (this.state.type === 'session') ? `${sessionLength}:00` : this.state.timer
        });
        break;
      default:
        break;
    }
  }

  timerFunction() {
    let timer = this.state.timer;
    let minutes = Number(timer.split(':')[0]);
    let seconds = Number(timer.split(':')[1]);
    let totalSeconds = ((minutes * 60) + seconds) - 1;
    if (minutes === 0 && seconds === 0) {
      let audioElement = document.getElementById('beep');
      audioElement.play();
      if (this.state.type === 'session') {
        this.setState({
          paused: false,
          timer: `${this.state.breakLength.toString().padStart(2, '0')}:00`,
          type: 'break'
        }); 
      } else {
        this.setState({
          paused: false,
          timer: `${this.state.sessionLength.toString().padStart(2, '0')}:00`,
          type: 'session'
        }); 
      }
    } else {
      minutes = Math.floor(totalSeconds / 60);
      seconds = totalSeconds - (minutes * 60);
      this.setState({
        paused: false,
        timer: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      });
    }
  }

  handleStartStop() {
    if (this.state.paused) {
      let timerId = setInterval(this.timerFunction, 1000);
      this.setState({
        timerId
      });
    } else {
      clearInterval(this.state.timerId);
      this.setState({
        paused: true
      });
    }
  }

  handleReset() {
    let audioElement = document.getElementById('beep');
    audioElement.pause();
    audioElement.currentTime = 0;
    clearInterval(this.state.timerId);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      type: 'session',
      timer: '25:00',
      timerId: 0,
      paused: true
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <Interactive type="break" length={this.state.breakLength} handleDecrementIncrement={this.handleDecrementIncrement}/>
        <Interactive type="session" length={this.state.sessionLength} handleDecrementIncrement={this.handleDecrementIncrement}/>
        <Timer type={this.state.type} timer={this.state.timer}/>
        <p id="start_stop" className="click" onClick={this.handleStartStop}>{(this.state.paused) ? PLAY : PAUSE}</p>
        <p id="reset" className="click" onClick={this.handleReset}>{RESET}</p>
        <audio id="beep" src={harpStrumming}></audio>
      </div>
    );
  }
}

export default App;
