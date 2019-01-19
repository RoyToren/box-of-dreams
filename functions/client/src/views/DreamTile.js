import React, {Component} from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ToggleButton from '@material-ui/core/Switch';

class DreamTile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleCheckedDream(this.props.dream);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <GridListTile key={this.props.dream.img}>
                <img src={this.props.dream.imageDownloadURL.stringValue} alt={this.props.dream.dreamName.stringValue} />
                <GridListTileBar style = {{direction: "ltr"}}
                  title={this.props.dream.dreamName.stringValue}
                  subtitle={<span>האם הוגשם: {this.props.dream.isDone.booleanValue ? 'כן' : 'לא'}</span>}
                  actionIcon={
                    <ToggleButton checked={this.props.dream.isDone.booleanValue} type="submit">
                    </ToggleButton>
                  }
                />
              </GridListTile>
          </form>
    );
  }
}

export default DreamTile;
