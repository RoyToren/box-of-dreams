import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const fab = {
  position: 'fixed',
  right: '0',
  bottom: '0',
};

class AddButton extends Component {
  render() {
    return (
      <div>
        <Fab color="primary" onClick={this.props.handleClick} aria-label="Add" className="fab" style={{fab}}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default AddButton;
