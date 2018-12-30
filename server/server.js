const express = require('express');
const app = express();
const port = 5000;

var admin = require('firebase-admin');
var serviceAccount = require('./boxofdreams-e7838-firebase-adminsdk-xuirj-07976f64c8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://boxofdreams-e7838.firebaseio.com',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes directory
require('./routes')(app);

app.get('/', (req, res) => {
  res.send('PORT 5000');
});

app.listen(port, (err) => {
  if (err) { console.log(err); };
  console.log('Listening on port ' + port);
});

var db = admin.firestore();
let query = db.collection('scores');

query.get().then(querySnapshot => {
  querySnapshot.forEach(documentSnapshot => {
    console.log(`key ${documentSnapshot.id} score value: ${documentSnapshot.data()["value"]}`);
  });
});
