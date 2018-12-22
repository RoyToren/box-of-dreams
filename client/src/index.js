import React from 'react';
import ReactDOM from 'react-dom';
import './views/css/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Views
import { App } from './views/app';

ReactDOM.render(
  <Router>
    <Route exact path='/' component={App}/>
  </Router>
  , document.getElementById('root'));
