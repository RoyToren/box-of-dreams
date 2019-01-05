import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import red from '@material-ui/core/colors/red';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/CloseSharp';
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
  constructor(props) {
    super(props);
    this.state = {
      creation: null,
      dreamName: '',
      dreamDescription: '',
      dreamStages: '',
      isDone: false,
      imageDownloadURL: 'https://firebasestorage.googleapis.com/v0/b/boxofdreams-e7838.appspot.com/o/dreams_images%2Fdream.jpg?alt=media&token=b1698c6b-9ee5-40be-b060-d2fc2222cd76',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveDream(this.state);
    this.props.exitCard();
    this.setState({});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal style={{overflow: 'auto'}} open={this.props.createDream}>
          <div className={classes.paper}>
            <Card className={classes.card}>
              <IconButton onClick={this.props.exitCard} style={{float: 'left'}}>
                <CloseIcon />
              </IconButton>
              <CardHeader
                title="הוסף חלום"
              />
              {/*         <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}

              <form onSubmit={this.handleSubmit}>
                <CardContent>
                  <TextField id="dreamName" label="שם חלום" className={classes.textField}
                    onChange={e => this.setState({dreamName: e.target.value})} margin="normal"/>
                  <TextField id="dreamDescription" label="תיאור" className={classes.textField}
                    onChange={e => this.setState({dreamDescription: e.target.value})} margin="normal"/>
                  <TextField id="dreamStages" label="בכדי להגשים צריך:" className={classes.textField}
                    onChange={e => this.setState({dreamStages: e.target.value})} margin="normal"/>
                  <TextField id="finishDate" label="תאריך יעד" className={classes.textField} margin="normal"/>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton type='submit' aria-label="save form" >
                    <SaveIcon/>
                  </IconButton>
                </CardActions>
              </form>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleModal);
