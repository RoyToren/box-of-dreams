import React, { Component } from 'react';
import './App.css';
import Dream from './Dream';
import AddButton from './AddButton';
import DreamForm from './DreamForm'
class App extends Component {
  state = { createDream: false};

  newDreamForm = () => {
    this.setState({createDream: true});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          ארגז של חלומות
        </header>
        <body dir="rtl">
        <Dream></Dream>
        <DreamForm createDream={this.state.createDream}></DreamForm>
        <AddButton handleClick={this.newDreamForm}></AddButton>
        </body>
      </div>
    );
  }
}

export default App;
