import React from 'react';
import './App.css';

const initialInput = `# Change this Markdown Previewer! This is an h1.
## This is an h2.
### This is an h3. Etc.

For inline code, you'll want to put it between back-ticks like so: \`<p>My Code</p>\`.

For multi-line code, do the following:
\`\`\`
function coolCode() {
  let coolestCode = 'Wow! This is the best code ever!';
  // More cool code...
  return coolestCode;
}
\`\`\`

We can make our text **bold** or _italic_ or _**both bold and italic**_ in **_two different ways_**!

We can also ~~cross things out~~.

Go crazy and create as many [links](https://www.freecodecamp.com) as you want!

We can also make 
>Block Quotes (Note you have to put these on a separate line)

- Create unordered 
  * lists 
    - for stuff (you need a space after the dashes/asterisks to create a list item)

1. Or
2. Create
3. Ordered
4. Lists
5. Wow! So many options!

You can also insert a cool image:
![Like my FAVORITE library at Cal :)](https://news.berkeley.edu/wp-content/uploads/2019/02/APA_31-1.jpg)

`;

function Editor(props) {
  return (
    <div className="left-content">
      <textarea id="editor" onChange={props.handleChange}>{props.input}</textarea>
    </div>
  );
}

function Previewer(props) {
  return (
    <div className="right-content">
      <div id="preview"></div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: initialInput,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    document.getElementById('preview').innerHTML = marked(this.state.input, {breaks:true});
  }
  
  handleChange(event) {
    let input = event.target.value;
    document.getElementById('preview').innerHTML = marked(input, {breaks:true});
    this.setState({
      input,
    });
  }
  
  render() {
    return (
      <div class="content">
        <Editor handleChange={this.handleChange} input={this.state.input}/>
        <Previewer input={this.state.input}/>
      </div>
    );
  }
}

export default App;
