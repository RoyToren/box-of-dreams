import React, { Component } from 'react';
import './css/App.css';
import Dreams from './Dreams';
import { TextField } from '@material-ui/core';
import axios from 'axios';
//import Welcome from './Welcome';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      password: '',
    };
    this.authenticate = this.authenticate.bind(this);

  }
  authenticate = function() {
    let password = this.state.password;
    axios.post('/authenticate', {
      password,
    }).then((response) => {
      this.setState({isAuthenticated: true});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if(!this.state.isAuthenticated)
    {
      return(
        <div>
          <TextField id="password" label="סיסמה"
                    onChange={e => this.setState({password: e.target.value})} margin="normal"/>
          <button onClick={this.authenticate}></button>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          ארגז של חלומות
        </header>
        <body dir="rtl" style={{overflowX:"hidden"}}>
          <Dreams></Dreams>
        </body>
      </div>
    );
  }
}

export {App};
