import React, { Component } from 'react';
import './css/App.css';
import Dreams from './Dreams';

class App extends Component {

  componentDidMount() {
    fetch('/user')
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({
            isLoading: data,
            cityNotFound: '404',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

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
