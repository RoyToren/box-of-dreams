
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
        var dream = document._fieldsProto;
        dream.id = document.id;
        data.push(dream);
      });
      res.send({data});
    });
  });
  app.post('/saveDream', function(req, res){
    if (req.body.dream) {
      req.body.dream.creation = new Date().toLocaleString();
      query.add(req.body.dream).then(ref => {
        console.log('added dream');
      });
      res.send('yay');
    } else {
      res.send('poop');
    }
  });
  app.post('/toggleDreamIsDone', function(req, res){
    if (req.body.checkedDream) {
      query.doc(req.body.checkedDream.id)
          .update({isDone: !req.body.checkedDream.isDone.booleanValue}).then(ref => {
            console.log('changed isDone');
            res.send(true);
          });
    } else {
      res.send('poop');
    }
  });
  

  app.post('/saveDreamImage', upload.single('avatar'), function(req, res){
      if(req.file)
      {
        
        storageRef.upload(req.file.path, { destination: 'dreams_images/'+req.file.originalname }).then(function(snapshot) {
          snapshot[0].bucket.file(snapshot[1].name).getSignedUrl({
            action: 'read',
            expires: '03-09-2500'
          }).then(function(signedUrl){
            res.send(signedUrl[0]);
          }); 
        });
      }
     else {
      res.send('poop');
    }
  });
};
