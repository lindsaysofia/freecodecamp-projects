// Sounds from https://www.freesoundeffects.com/
import React from 'react';
import './App.css';
import cheetah from './cheetah.mp3';
import coyote from './coyote.mp3';
import dog from './dog.mp3';
import elephant from './elephant.mp3';
import lion from './lion.mp3';
import monkey from './monkey.mp3';
import pig from './pig.mp3';
import rattlesnake from './rattlesnake.mp3';
import seal from './seal.mp3';

const INFO = {
  'Q': {description: 'cheetah', source: cheetah},
  'W': {description: 'coyote', source: coyote},
  'E': {description: 'dog', source: dog},
  'A': {description: 'elephant', source: elephant},
  'S': {description: 'lion', source: lion},
  'D': {description: 'monkey', source: monkey},
  'Z': {description: 'pig', source: pig},
  'X': {description: 'rattlesnake', source: rattlesnake},
  'C': {description: 'seal', source: seal}
};

function DrumPad(props) {
  return (
    // Need to add arrow funtion to avoid passing in the event
    <div className="drum-pad" id={INFO[props.shortcutKey].description} onClick={() => props.handleClick(props.shortcutKey)} >
      <p>{props.shortcutKey}</p>
      <audio id={props.shortcutKey} className="clip" src={INFO[props.shortcutKey].source}></audio>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Press a key or click a button!'
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleKeyPress(event) {
    let keyPressed = event.key.toUpperCase();
    if (INFO.hasOwnProperty(keyPressed)) {
      this.handleClick(keyPressed);
    }
  }

  handleClick(shortcutKey) {
    let allAudioElements = document.getElementsByTagName('audio');
    Array.from(allAudioElements).forEach(audioElement => {
      // audioElement.currentTime = 0;
      audioElement.pause();
    });
    let targetAudioElement = document.getElementById(shortcutKey);
    targetAudioElement.play();
    this.setState({
      display: INFO[shortcutKey].description
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  
  render() {
    return (
      <div id="drum-machine">
  <p id="display">{this.state.display}</p>
        <div class="drum-pads-container">
          <DrumPad handleClick={this.handleClick} shortcutKey="Q" />
          <DrumPad handleClick={this.handleClick} shortcutKey="W" />
          <DrumPad handleClick={this.handleClick} shortcutKey="E" />
          <DrumPad handleClick={this.handleClick} shortcutKey="A" />
          <DrumPad handleClick={this.handleClick} shortcutKey="S" />
          <DrumPad handleClick={this.handleClick} shortcutKey="D" />
          <DrumPad handleClick={this.handleClick} shortcutKey="Z" />
          <DrumPad handleClick={this.handleClick} shortcutKey="X" />
          <DrumPad handleClick={this.handleClick} shortcutKey="C" />
        </div>
      </div>
    );
  }
}

export default App;
