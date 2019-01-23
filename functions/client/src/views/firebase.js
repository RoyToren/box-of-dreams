import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Views
import { App } from './app';
const config = ({
        apiKey: "AIzaSyC6tSkP0HT9TuLFconZXcrIKvGnkdRMwWk",
        authDomain: "boxofdreams-e7838.firebaseapp.com",
        databaseURL: "https://boxofdreams-e7838.firebaseio.com",
        projectId: "boxofdreams-e7838",
        storageBucket: "boxofdreams-e7838.appspot.com",
        messagingSenderId: "1016224671288"
})

// This must run before any other firebase functions
firebase.initializeApp(config)

// This is our firebaseui configuration object
const uiConfig = ({
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
})


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
              })
              .catch((error) => {
                console.log(error);
              });
        }
   else {
    // logout
  }
})

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
