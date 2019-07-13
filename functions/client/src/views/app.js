import React, { Component } from "react";
import Dreams from "./Dreams";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendSharp from "@material-ui/icons/SendSharp";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import firebase from "firebase/app";
import 'firebase/auth';
//import Welcome from './Welcome';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      password: ""
    };
    this.authenticate = this.authenticate.bind(this);
  }
  authenticate = function() {
    var authData = {
      password: this.state.password,
      user: firebase.auth().currentUser
    };
    axios
      .post("/authenticate", {
        authData
      })
      .then(response => {
        this.setState({ isAuthenticated: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    var user = firebase.auth().currentUser;
    axios
      .post("/checkAuth", {
        user
      })
      .then(response => {
        if (response.data) {
          this.setState({ isAuthenticated: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <h1>היי! נשאר עוד צעד אחד קטן</h1>
          <p>
            כדי לוודא שאתם מורשים להיכנס לכאן, אנחנו צריכים שתזינו את הסיסמה
            שקיבלתם
          </p>
          <TextField
            id="password"
            label="סיסמה"
            onChange={e => this.setState({ password: e.target.value })}
            margin="normal"
          />
          <IconButton
            onClick={this.authenticate}
            style={{ display: "contents" }}
            aria-label="save form"
          >
            שלח
            <SendSharp />
          </IconButton>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header" style={styles.header}>
          <AppBar position="static" style={styles.appbar}>
            <Toolbar>
              <Typography variant="h4" style={styles.topography}>
                ארגז של חלומות - ניהול אפליקציה
              </Typography>
            </Toolbar>
          </AppBar>
        </header>
        <div dir="rtl" style={{ overflowX: "hidden", height: "100%"}}>
          <Dreams />
        </div>
      </div>
    );
  }
}

// GREY: 'rgb(156,156,156)',
//         OFF_WHITE: '#f5f6f5',

const styles = {
  header: {
    paddingBottom: 8
  },
  appbar: {
    direction: 'rtl', 
    backgroundColor: 'rgb(38,112,204)',
  },
  topography: {
    color: 'white',
    fontStyle: 'bold',
  }
};

export { App };
