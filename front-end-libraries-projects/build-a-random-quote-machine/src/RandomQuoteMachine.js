import React from 'react';
import QUOTES from './quotes';

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      author: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  getQuote() {
    let randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
  }
  
  /* Generate a number between min and max */
  generateRandomNumber() {
    let min = 25;
    let max = 200;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  /* How to add FCC script: https://stackoverflow.com/questions/53805387/render-script-tag-in-react-component */
  
  componentDidMount() {
    // uncomment to run FCC tests
    // const script = document.createElement("script");
    // script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    // script.async = true;
    // document.body.appendChild(script);
    this.handleClick();
  }
  
  handleClick() {
    let randomQuote = this.getQuote();
    let randomColor = `rgb(${this.generateRandomNumber()}, ${this.generateRandomNumber()}, ${this.generateRandomNumber()})`;
    document.body.style.backgroundColor = randomColor;
    document.getElementById('text').style.color= randomColor;
    document.getElementById('author').style.color= randomColor;
    document.getElementById('new-quote').style.backgroundColor= randomColor;
    document.getElementById('tweet-quote').style.backgroundColor= randomColor;
    this.setState({
      text: randomQuote.quote,
      author: randomQuote.author,
    });
  }
  
  render() {
    return (
      <div id="quote-box">
        <p id="text">"{this.state.text}"</p>
        <p id="author">- {this.state.author}</p>
        <div class="clickable-elements">
          <a id="tweet-quote" href="twitter.com/intent/tweet">Tweet Quote</a>
          <button id="new-quote" onClick={this.handleClick}>New Quote</button>
        </div>
      </div> 
    );
  }
}

export default RandomQuoteMachine;