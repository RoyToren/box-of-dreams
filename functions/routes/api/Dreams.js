
module.exports = (app) => {

  var multer  = require('multer');
  var upload = multer({ dest: 'dreamImages/' })
  var admin = require('firebase-admin');
  var serviceAccount = require('../../boxofdreams-e7838-firebase-adminsdk-xuirj-07976f64c8.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://boxofdreams-e7838.firebaseio.com',
    storageBucket: 'gs://boxofdreams-e7838.appspot.com'
  });

  var db = admin.firestore();
  var storageRef = admin.storage().bucket();
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
    if (req.body.dream) {
      if(req.body.dream.files)
      {
        storageRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
        });
      }
      query.doc('roy').set(req.body.dream);
      res.send('yay');
    } else {
      res.send('poop');
    }
  });

  app.post('/saveDreamImage', upload.single('avatar'), function(req, res){
      if(req.file)
      {
        storageRef.upload(req.file.path, { destination: 'dreams_images/'+req.file.originalname }).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          res.send('yay');
        });
      }
     else {
      res.send('poop');
    }
  });
};
