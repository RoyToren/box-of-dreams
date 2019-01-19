import React, { Component } from 'react';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddButton from './AddButton';
import DreamForm from './DreamForm';
import FormData from 'form-data';
import DreamTile from "./DreamTile";


const root = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
  backgroundColor: 'white',
};

const gridList = {
  width: '-webkit-fill-available',
  height: '-webkit-fill-available',
};


class Dreams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createDream: false,
      data: [],
      loading: true,
    };
  }

  discardDream = () => {
    this.setState({createDream: false});
  }
  createNewDream = () => {
    this.setState({createDream: true});
  }

  handleCheckedDream = (checkedDream) => {
    axios.post('/toggleDreamIsDone', {
      checkedDream,
      }).then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  handleSave = (dream) => {
    var avatar = new FormData();
    avatar.append('avatar', dream.files[0]);

    axios.post('/saveDreamImage', avatar , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    dream.files = undefined;
    axios.post('/saveDream', {
      dream,
    }).then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillMount() {
    fetch('/getDreams')
      .then(res => res.json())
      .then(dreams => {
        if (dreams) {
          this.setState({
            data: dreams.data,
            loading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.loading){
      return (
        <div style={{root}}>
          <GridList cellHeight={180} style={{gridList}}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">חלומות</ListSubheader>
            </GridListTile>
            {this.state.data.map(tile => (
              <DreamTile key={tile.id} dream={tile} handleCheckedDream={this.handleCheckedDream}></DreamTile>
            ))}
          </GridList>
          <DreamForm createDream={this.state.createDream} exitCard={this.discardDream}
            saveDream={this.handleSave}></DreamForm>
          <AddButton handleClick={this.createNewDream}></AddButton>
        </div>
      );
    }
    return (
      <div style={{root}}></div>
    );
  }
}

export default Dreams;
