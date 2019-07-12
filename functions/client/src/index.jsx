import React from 'react';
import ReactDOM from 'react-dom';
import './views/css/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Views
import { StartFirebaseUI } from './views/firebase';
ReactDOM.render(
  <Router>
    <Route exact path='/' component={StartFirebaseUI}/>
  </Router>
  , document.getElementById('root'));
