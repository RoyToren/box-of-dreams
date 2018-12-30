import React, { Component } from 'react';
import './css/App.css';
import Dreams from './Dreams';
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          ארגז של חלומות
        </header>
        <body dir="rtl">
          <Dreams></Dreams>
        </body>
      </div>
    );
  }
}

export {App};
