import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DreamForm from './DreamForm';
const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: '0',
    bottom: '0',
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => <DreamForm></DreamForm>}>
        <AddIcon />
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);