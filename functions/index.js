const express = require('express');
const functions = require('firebase-functions');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + './../client/build')); //serves the index.html

// Import Routes directory
require('./routes')(app);
require('./services/mailService')(app);
app.get('/', (req, res) => {
  //res.send('hello');
  res.sendFile(__dirname + './../client/build/index.html');
});

app.listen(port, (err) => {
  if (err) { console.log(err); };
  console.log('Listening on port ' + port);
});


 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.app = functions.https.onRequest(app);
