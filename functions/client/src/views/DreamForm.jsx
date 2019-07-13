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
import ImageDrop from './ImageDrop';
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
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
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
      files: [],
      imageDownloadURL: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageInput = this.handleImageInput.bind(this);
  }
  componentDidMount(){
    if(this.props.editedDream)
    this.setState({
      id: this.props.editedDream.id,
      creation : this.props.editedDream.creation.stringValue,
      dreamName : this.props.editedDream.dreamName.stringValue,
      dreamDescription : this.props.editedDream.dreamDescription.stringValue,
      dreamStages : this.props.editedDream.dreamStages.stringValue,
      imageDownloadURL : this.props.editedDream.imageDownloadURL.stringValue,
      isDone : this.props.editedDream.isDone.booleanValue,
      files : undefined,
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveDream(this.state);
    this.props.exitCard();
    this.setState({});
  }

  handleImageInput(value) {
    this.setState({files: value})
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
              <form onSubmit={this.handleSubmit}>
                <CardContent>
                <ImageDrop onChange={this.handleImageInput}/>
                  <TextField id="dreamName" label="שם חלום" value={this.state.dreamName} className={classes.textField}
                    onChange={e => this.setState({dreamName: e.target.value})} margin="normal"/>
                  <TextField id="dreamDescription" label="תיאור" value={this.state.dreamDescription} className={classes.textField}
                    onChange={e => this.setState({dreamDescription: e.target.value})} margin="normal"/>
                  <TextField id="dreamStages" label="בכדי להגשים צריך:" value={this.state.dreamStages} className={classes.textField}
                    onChange={e => this.setState({dreamStages: e.target.value})} margin="normal"/>
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
