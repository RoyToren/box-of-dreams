import React, { Component } from 'react';
import './css/App.css';
import Dreams from './Dreams';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendSharp from '@material-ui/icons/SendSharp';
import axios from 'axios';
import * as firebase from 'firebase'
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
    
    var authData = {
     password: this.state.password,
     user: firebase.auth().currentUser,
    }
    axios.post('/authenticate', {
      authData,
    }).then((response) => {
      this.setState({isAuthenticated: true});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillMount() {
    var user = firebase.auth().currentUser;
    axios.post('/checkAuth', {
      user,
    }).then((response) => {
      if(response.data)
      {
        this.setState({isAuthenticated: true});
      }
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
        <h1>היי! נשאר עוד צעד אחד קטן</h1>
        <p>כדי לוודא שאתם מורשים להיכנס לכאן, אנחנו צריכים שתזינו את הסיסמה שקיבלתם</p>
          <TextField id="password" label="סיסמה"
                    onChange={e => this.setState({password: e.target.value})} margin="normal"/>
        <IconButton onClick={this.authenticate} style={{display: 'contents'}} aria-label="save form" >
                  שלח<SendSharp/>
                  </IconButton>  
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
