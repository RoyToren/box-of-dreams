import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class AddButton extends Component {
  render() {
    return (
      <div>
        <Fab color="primary" onClick={this.props.handleClick} aria-label="Add" className="fab" style={styles.fab}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const styles = {
  fab: {
    position: 'fixed',
    right: '0',
    bottom: '0',
    margin: '16px',
  }
};

export default AddButton;
