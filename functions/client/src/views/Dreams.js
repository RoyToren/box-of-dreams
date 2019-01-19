import React, { Component } from 'react';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddButton from './AddButton';
import DreamForm from './DreamForm';
import FormData from 'form-data';


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

const icon = {
  color: 'rgba(255, 255, 255, 0.54)',
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
              <GridListTile key={tile.img}>
                <img src={tile.imageDownloadURL.stringValue} alt={tile.dreamName.stringValue} />
                <GridListTileBar
                  title={tile.dreamName.stringValue}
                  subtitle={<span>האם הוגשם: {tile.isDone.booleanValue ? 'כן' : 'לא'}</span>}
                  actionIcon={
                    <IconButton style={icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
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
