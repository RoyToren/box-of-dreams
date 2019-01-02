
module.exports = (app) => {

  var admin = require('firebase-admin');
  var serviceAccount = require('../../boxofdreams-e7838-firebase-adminsdk-xuirj-07976f64c8.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://boxofdreams-e7838.firebaseio.com',
  });

  var db = admin.firestore();
  let query = db.collection('Dreams');

  app.get('/getDreams', function(req, res){
    query.get().then(querySnapshot => {
      var data = [];
      querySnapshot.docs.forEach(document => {
        data.push(document._fieldsProto);
      });
      res.send({data});
    });
  });
  app.post('/saveDream', function(req, res){
    var x = req;
    res.send('yay');
  });

};
