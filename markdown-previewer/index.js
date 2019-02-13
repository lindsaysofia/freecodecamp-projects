// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
// document.getElementById('content').innerHTML =
//       marked('# Marked in the browser\n\nRendered by **marked**.');

const defaultInput = `
# This is an h1. 
## This is an h2.
This is a [link](https://www.youtube.com/) to YouTube.

This is how to write some code: \`<div></div>\`

\`\`\`
/* 
Between these sets of backticks, we can write multi-line code. We can even write a function!
*/

function coolFunction() {
  console.log('This is a cool function!');
}

\`\`\`

More cool things:
- We can make a list item.
- And another list item.

We can also have
> Blockquotes if we want!
> How awesome is that?

Let's *not* forget **Images** (And _italic_ and ***bold*** text for that matter).

Have fun and enjoy this random image!

![Random image from unsplash](https://source.unsplash.com/random/200x200)
`;

class Editor extends React.Component {
  render() {
    return (
      <div class="left">
        <h2 class="left__header">Editor</h2>
        <textarea id="editor" class="left__content" value={this.props.input} onChange={this.props.onChange}>
        </textarea>
      </div>
    );
  }
}

class Previewer extends React.Component {
  render() {
    return (
      <div class="right">
        <h2 class="right__header">Preview</h2>
        <div id="preview" class="right__content" dangerouslySetInnerHTML={{__html:marked(this.props.input, {breaks: true})}} />
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultInput
    };
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(e) {
    this.setState({
      input: e.target.value
    })
  }
  
  render() {
    return (
      <div class="container">
        <Editor onChange={this.onChange} input={this.state.input}/>
        <Previewer input={this.state.input}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
