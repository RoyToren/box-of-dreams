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
      open: true,
      dream: {
        creation: null,
        dreamName: '',
        dreamDescription: '',
        dreamStages: '',
        isDone: false,
        imageDownloadURL: 'https://firebasestorage.googleapis.com/v0/b/boxofdreams-e7838.appspot.com/o/dreams_images%2Fdream.jpg?alt=media&token=b1698c6b-9ee5-40be-b060-d2fc2222cd76',
      },
    };
    this.handleNameChange.bind(this);
    this.handleDescriptionChange.bind(this);
    this.handleStagesChange.bind(this);
    this.handleSave.bind(this);

  }
  handleClose = () => {
    this.setState({ open: false });

  };
  handleSave = () => {
    fetch('/saveDream', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.dream),
    })
      .then(function(data){
        console.log(data);
      });
  };

  handleNameChange = (event) => {
    this.setState({ dream: {dreamName: event.target.value}});
  };

  handleDescriptionChange = (event) => {
    this.setState({ dream: {dreamDescription: event.target.value}});
  };
  handleStagesChange = (event) => {
    this.setState({ dream: {dreamStages: event.target.value}});
  };
  render() {
    const { classes } = this.props;

    return (
      <form>
        <div>
          <Modal style={{overflow: 'auto'}} open={this.props.createDream} onClose={this.handleClose}>
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
                <CardContent>
                  <TextField
                    id="dreamName"
                    label="שם חלום"
                    className={classes.textField}
                    value={this.state.dream.dreamName}
                    onChange={this.handleNameChange}
                    margin="normal"
                  />
                  <TextField
                    id="dreamDescription"
                    label="תיאור"
                    className={classes.textField}
                    value={this.state.dream.dreamDescription}
                    onChange={this.handleDescriptionChange}
                    margin="normal"
                  />
                  <TextField
                    id="dreamStages"
                    label="בכדי להגשים צריך:"
                    className={classes.textField}
                    value={this.state.dream.dreamStages}
                    onChange={this.handleStagesChange}
                    margin="normal"
                  />
                  <TextField
                    id="finishDate"
                    label="תאריך יעד"
                    className={classes.textField}
                    /* value={this.state.name}
          onChange={this.handleChange('name')} */
                    margin="normal"
                  />

                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton type="submit" aria-label="save form" onClick={this.handleSave()}>
                    <SaveIcon/>
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          </Modal>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(SimpleModal);


/* import React from 'react';

export class ReactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    fetch('http://example.com/movies.json', {
      body: JSON.stringify(this.state),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          alert('Saved');
        } else {
          alert('Issues saving');
        }
        // you cannot parse your "success" response, since that is not a valid JSON
        // consider using valid JSON req/resp pairs.
        // return response.json();
      });

  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind()}>
        <input type="text" name="username" onChange={e => this.setState({username: e.target.value})}/>
        <input type="password" name="password" onChange={e => this.setState({password: e.target.value})}/>
        <input type="text" name="first_name" onChange={e => this.setState({first_name: e.target.value})}/>
        <input type="text" name="last_name" onChange={e => this.setState({last_name: e.target.value})}/>
        <button type="submit">Submit</button>
      </form>
    );
  }
} */