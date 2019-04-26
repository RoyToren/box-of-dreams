import React, { Component } from "react";
import ToggleButton from "@material-ui/core/Switch";
import EditButton from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from '@material-ui/core/IconButton';
import DreamForm from "./DreamForm";

class DreamTile extends Component {
  constructor(props) {
    super(props);
    this.state= {
      editDream: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editSelectedDream = this.editSelectedDream.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleCheckedDream(this.props.dream);
  }
  editSelectedDream = () => {
    this.setState({ editDream: true });
  };
  discardDream = () => {
    this.setState({ editDream: false });
  };

  deleteDream = () => {
    if (this.props.handleDelete) {
      this.props.handleDelete(this.props.dream);
    }
  }

  render() {
    return (
      <form style={styles.tile}>
        <div style={styles.topSection}>
          <img
            src={this.props.dream.imageDownloadURL.stringValue}
            alt={this.props.dream.dreamName.stringValue}
            style={styles.fillImage}
          />
        </div>
        <div style={styles.bottomSection}>
          <span style={styles.title}>{this.props.dream.dreamName.stringValue}</span>
          <span>האם הוגשם: </span>
          <ToggleButton checked={this.props.dream.isDone.booleanValue} onClick={this.handleSubmit}/>
          <IconButton onClick={this.editSelectedDream} aria-label="edit form" >
               <EditButton/>
          </IconButton>
          <IconButton onClick={this.deleteDream} aria-label="delete dream" >
               <DeleteRoundedIcon />
          </IconButton>
        </div>
        <DreamForm
        editedDream={this.props.dream}
        createDream={this.state.editDream}
        exitCard={this.discardDream}
        saveDream={this.props.saveDream}
       />
      </form>
    );
  }
}

const styles = {
  tile: {
    width: "100%",
    height: "100%"
  },
  topSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  fillImage: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  bottomSection: {
    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    bottom: 0,
    padding: 4,
  },
  title: {
    display: 'block',
    fontStyle: 'bold',
    fontSize: 20
  }
};

export default DreamTile;
