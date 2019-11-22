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

function DrumPad(props) {
  return (
    <div className="drum-pad" id={props.description} onClick={props.handleClick}>
      <p>{props.shortcutKey}</p>
      <audio id={props.shortcutKey} className="clip" src={cheetah}>hey</audio>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick() {
    let audioElement = document.getElementById("Q");
    audioElement.play();
  }
  
  render() {
    return (
      <div id="drum-machine">
        <p id="display"></p>
        <div class="drum-pads-container">
          <DrumPad handleClick={this.handleClick} description="cheetah" shortcutKey="Q"/>
          {/* <DrumPad key="W"/>
          <DrumPad key="E"/>
          <DrumPad key="A"/>
          <DrumPad key="S"/>
          <DrumPad key="D"/>
          <DrumPad key="Z"/>
          <DrumPad key="X"/>
          <DrumPad key="C"/> */}
        </div>
      </div>
    );
  }
}

export default App;
