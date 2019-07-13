const path = require('path');
const express = require('express');
const compression = require('compression');
const functions = require('firebase-functions');
const app = express();
const port = 5000;
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build'))); //serves the index.html

app.use(cors({
  'allowedHeaders': [
      'sessionId', 'Content-Type'
  ],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

const {fileParser} = require('express-multipart-file-parser');
app.use(fileParser({
    rawBodyOptions: {
        limit: '15mb', //file size limit
    },
    busboyOptions: {
        limits: {
            fields: 20 //Number text fields allowed
        }
    }
}));
app.use(compression());
// Import Routes directory
require('./routes')(app);
require('./services/mailService/mailService')(app);
app.get('/', (req, res) => {
  //res.send('hello');
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, (err) => {
  if (err) { console.log(err); }
  console.log('Listening on port ' + port);
});


 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.app = functions.https.onRequest(app);
