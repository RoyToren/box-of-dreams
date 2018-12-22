import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import red from '@material-ui/core/colors/red';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  paper: {
    position: 'absolute',
    direction: 'rtl',
    backgroundColor: 'white',
    top: '50%',
    left: '50%',
    margin: 0,
    transform: 'translate(-50%, -50%)',
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    direction: 'rtl',
    width: 200,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class SimpleModal extends React.Component {
  handleClose = () => {
    this.setState({ open: false });
  };

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal style={{overflow: 'auto'}} open={this.props.createDream} onClose={this.handleClose}>
          <div className={classes.paper}>
            <Card className={classes.card}>
              <IconButton style={{float: 'left'}}>
                <ExitToApp />
              </IconButton>
              <CardHeader
                title="הוסף חלום"
              />
              {/*         <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
              <TextField
                id="standard-name"
                label="שם"
                className={classes.textField}
                /* value={this.state.name}
          onChange={this.handleChange('name')} */
                margin="normal"
              />
              <CardContent>
                <Typography component="p">
          שלום
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography textbox>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
                  </Typography>
                  <Typography paragraph>
            ככה
                  </Typography>
                  <Typography paragraph>
            וגם ככה
                  </Typography>
                  <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleModal);
