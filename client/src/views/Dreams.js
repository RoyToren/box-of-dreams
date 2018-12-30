import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import dreamData from './dreamData';
import AddButton from './AddButton';
import DreamForm from './DreamForm';

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
  state = { createDream: false};

  discardDream = () => {
    this.setState({createDream: false});
  }
  createNewDream = () => {
    this.setState({createDream: true});
  }
  render() {
    return (
      <div style={{root}}>
        <GridList cellHeight={180} style={{gridList}}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">חלומות</ListSubheader>
          </GridListTile>
          {dreamData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>מוגשם על ידי: {tile.author}</span>}
                actionIcon={
                  <IconButton style={icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <DreamForm createDream={this.state.createDream} exitCard={this.discardDream}></DreamForm>
        <AddButton handleClick={this.createNewDream}></AddButton>
      </div>
    );
  }
}

export default Dreams;
