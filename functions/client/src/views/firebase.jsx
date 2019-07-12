import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebaseConfig} from './../firebaseConf'
// Views
import { App } from './app';

// This must run before any other firebase functions
firebase.initializeApp(firebaseConfig);

// This is our firebaseui configuration object
const uiConfig = ({
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
});


firebase.auth().onAuthStateChanged((user) => {
  // if user isn't null then we logged in
  if (user) {
          axios.post('/saveUser', {
              user,
            }).then(() => {
              ReactDOM.render(
                  <Router>
                  <Route exact path='/' component={App}/>
                  </Router>
                  , document.getElementById('root'));
              return true;
              })
              .catch((error) => {
                console.log(error);
              });
        }
   else {
    // logout
  }
});

// This adds firebaseui to the page
// It does everything else on its own
class StartFirebaseUI extends React.Component {
  render() {
    return (
      <div>
        <h1>ברוך הבא לארגז של חלומות</h1>
        <p>להתחברות לחץ מטה</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export  {StartFirebaseUI}
