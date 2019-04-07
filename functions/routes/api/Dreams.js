
module.exports = (app) => {

  var multer  = require('multer');
  var path = require('path');
  var storage = multer.memoryStorage()
  var upload = multer({ storage: storage })
  var admin = require('firebase-admin');
  var serviceAccount = require('../../boxofdreams-ServiceAccount.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://boxofdreams-e7838.firebaseio.com',
    storageBucket: 'gs://boxofdreams-e7838.appspot.com'
  });

  var db = admin.firestore();
  var storageRef = admin.storage().bucket();
  let dreamQuery = db.collection('Dreams').orderBy('creation', 'desc');
  let paramsQuery = db.collection('Params');
  let usersQuery = db.collection('Users');

  app.get('/getDreams', (req, res) => {
    dreamQuery.get().then(querySnapshot => {
      var data = [];
      querySnapshot.docs.forEach(document => {
        var dream = document._fieldsProto;
        dream.id = document.id;
        data.push(dream);
      });
      res.send({data});
    });
  });

  app.post('/authenticate', (req, res) => {
    if (req.body.authData.password !== '') {
      paramsQuery.doc('password').get().then(querySnapshot => {
        if(req.body.authData.password === querySnapshot._fieldsProto.password.stringValue)
        {
          usersQuery.doc(req.body.authData.user.email)
          .update({isAuthenticated: true}).then(ref => {
            console.log('changed isDone');
            res.send(true);
          });
        }
        else
        {
          res.send('wrong password');
        }
        res.send('poop');
      });
    }
  });

  app.post('/checkAuth', (req, res) => {
    if (req.body.user) {
      usersQuery.doc(req.body.user.email).get().then(querySnapshot => {
        res.send(querySnapshot._fieldsProto.isAuthenticated.booleanValue);
      });
    }
  });

  app.post('/saveUser', (req, res) => {
    if (req.body.user) {
      usersQuery.doc(req.body.user.email).get().then(querySnapshot => {
        if(querySnapshot.exists) {
          res.send(true);
        } else {
          usersQuery.doc(req.body.user.email).set({
            isAuthenticated: false,
        })
        .then(() => {
            res.send('yay');
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        }
        
        
      })
    
    } else {
      res.send('poop');
    }
  });
  app.post('/saveDream', (req, res) => {
    if (req.body.dream) {
      req.body.dream.creation = new Date().toLocaleString();
      dreamQuery.add(req.body.dream).then(ref => {
        console.log('added dream');
      });
      res.send('yay');
    } else {
      res.send('poop');
    }
  });

  app.post('/toggleDreamIsDone', (req, res) => {
    if (req.body.checkedDream) {
      dreamQuery.doc(req.body.checkedDream.id)
          .update({isDone: !req.body.checkedDream.isDone.booleanValue}).then(ref => {
            console.log('changed isDone');
            res.send(true);
          });
    } else {
      res.send('poop');
    }
  });
  

  app.post('/saveDreamImage', upload.single('avatar'), (req, res) => {
      if(req.file)
      {
        const filePath = path.join('dreams_images/',req.file.originalname)
        storageRef.file(filePath).save(req.file.buffer);
        storageRef.file(filePath).getSignedUrl({
          action: 'read',
          expires: '03-09-2500'
        }).then((signedUrl) => {
          res.send(signedUrl[0]);
        });
      }
     else {
      res.send('poop');
    }
  });
};
