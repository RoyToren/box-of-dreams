import React, { Component } from "react";
import axios from "axios";
import AddButton from "./AddButton";
import DreamForm from "./DreamForm";
import FormData from "form-data";
import DreamTile from "./DreamTile";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const root = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  overflow: "hidden",
  backgroundColor: "white"
};

class Dreams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createDream: false,
      data: [],
      loading: true
    };
    this.loader = this.loader.bind(this);
  }

  discardDream = () => {
    this.setState({ createDream: false });
  };
  createNewDream = () => {
    this.setState({ createDream: true });
  };

  handleCheckedDream = checkedDream => {
    axios
      .post("/toggleDreamIsDone", {
        checkedDream
      })
      .then((res) => {
        this.loader();
        return true;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };

  loader = function() {
    fetch("/getDreams")
      .then(res => res.json())
      .then(dreams => {
        if (dreams) {
          this.setState({
            data: dreams.data,
            loading: false
          });
        }
        return true;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };  

  handleSave = dream => {
    if(!dream.files){
      axios.post("/saveDream", {
        dream})
      .then(response => {
        this.loader();
        return true;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
    }
    else
    {
      var avatar = new FormData();
    avatar.append("avatar", dream.files[0]);
    axios.post("/saveDreamImage", avatar, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        dream.files = undefined;
        dream.imageDownloadURL = response.data;
        axios.post("/saveDream", {
          dream})
        .then(response => {
          setTimeout(this.loader(), 15000);
          return true;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
        return true;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
    }
  };

  handleDelete = (dream) => {
    axios.post("/deleteDream", { dream })
          .then(response => {
            this.loader(); 
            return true;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
  }

  componentDidMount() {
    this.loader();
  }

  render() {
    if (!this.state.loading) {
      const dreamTiles = this.state.data.map(tile => (
        <Grid key={tile.id} item style={styles.item}>
          <Paper style={styles.paper}>
            <DreamTile
              key={tile.id}
              dream={tile}
              handleCheckedDream={this.handleCheckedDream}
              handleDelete={this.handleDelete}
              saveDream={this.handleSave}
            />
          </Paper>
        </Grid>
      ));

      return (
        <div style={{ root }}>
          <Grid container style={styles.root} justify="center" spacing={8}>
            {dreamTiles}
          </Grid>

          <DreamForm
            createDream={this.state.createDream}
            exitCard={this.discardDream}
            saveDream={this.handleSave}
          />
          <AddButton handleClick={this.createNewDream} />
        </div>
      );
    }
    return <div style={{ root }} />;
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 300,
    padding: 8
  },
  item: {
    padding: 8
  }
};

export default Dreams;
