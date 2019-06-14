module.exports = (app) => {

    const multer = require('multer');
    const path = require('path');
    const storage = multer.memoryStorage()
    const upload = multer({storage: storage})
    const admin = require('firebase-admin');
    const serviceAccount = require('../../boxofdreams-ServiceAccount.json');
    const uuidv4 = require('uuid/v4'); //to give unique name to each file

    admin.initializeApp({
        credential: admin
            .credential
            .cert(serviceAccount),
        databaseURL: 'https://boxofdreams-e7838.firebaseio.com',
        storageBucket: 'gs://boxofdreams-e7838.appspot.com'
    });

    var db = admin.firestore();
    var storageRef = admin
        .storage()
        .bucket();
    let dreamQuery = db.collection('Dreams');
    let paramsQuery = db.collection('Params');
    let usersQuery = db.collection('Users');

    app.get('/getDreams', (req, res) => {
        dreamQuery
            .orderBy('creation', 'desc')
            .get()
            .then(querySnapshot => {
                var data = [];
                querySnapshot
                    .docs
                    .forEach(document => {
                        var dream = document._fieldsProto;
                        dream.id = document.id;
                        data.push(dream);
                    });
                return res.send({data});
            })
            .catch(err => {
                return res.send('get dreams failed:' + err)
            });
    });

    app.post('/authenticate', (req, res) => {
        if (req.body.authData.password !== '') {
            paramsQuery
                .doc('password')
                .get()
                .then(querySnapshot => {
                    if (req.body.authData.password === querySnapshot._fieldsProto.password.stringValue) {
                        usersQuery
                            .doc(req.body.authData.user.email)
                            .update({isAuthenticated: true})
                            .then(ref => {
                                console.log('changed isDone');
                                return res.send(true);
                            })
                            .catch(err => {
                                return res.send('failed to update auth of user' + err)
                            });
                    } else {
                        return res.send('wrong password');
                    }
                    return res.send('good auth');
                })
                .catch(err => {
                    return res.send('failed to auth with password: ' + err)
                });
        }
    });

    app.post('/checkAuth', (req, res) => {
        if (req.body.user) {
            usersQuery
                .doc(req.body.user.email)
                .get()
                .then(querySnapshot => {
                    return res.send(querySnapshot._fieldsProto.isAuthenticated.booleanValue);
                })
                .catch(err => {
                    res.send("failed to checkAuth: " + err)
                });
        }
    });

    app.post('/saveUser', (req, res) => {
        if (req.body.user) {
            usersQuery
                .doc(req.body.user.email)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.exists) {
                        return res.send(true);
                    } else {
                        usersQuery
                            .doc(req.body.user.email)
                            .set({isAuthenticated: false})
                            .then(() => {
                                console.log("Document successfully written!");
                                return res.send('yay');
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                                return res.send('error saving user: ' + error);
                            });
                    }
                    return res.send('successful save user');
                })
                .catch(err => {
                    return res.send('couldnt get user: ' + err)
                })

        } else {
            res.send('poop');
        }
    });

    app.post('/saveDream', (req, res) => {
        const dream = req.body.dream;
        if (dream) {
            if (!dream.creation) {
                dream.creation = new Date().toLocaleString();
            }
            if (req.body.dream.id) {
                dreamQuery
                    .doc(dream.id)
                    .set({
                        ...dream
                    }, {merge: true})
                    .then(ref => {
                        console.log('dream edited');
                        return res.send('dream edited successfully');
                    })
                    .catch(reason => {
                        return res.send('edit dream failed: ' + reason);
                    });
            } else {
                dreamQuery
                    .add(dream)
                    .then(ref => {
                        console.log('dream added');
                        return res.send('added dream successful');
                    })
                    .catch(reason => {
                        res.send('failed to add dream: ' + err);
                    });
            }
        } else {
            res.send('failed to add dream: no dream is in the request');
        }
    });

    app.post('/deleteDream', (req, res) => {
        if (req.body.dream) {
            dreamQuery
                .doc(req.body.dream.id)
                .delete()
                .then(() => {
                    console.log('Dream deleted successfully');
                    return res.send("dream deleted successfully")
                })
                .catch((err) => {
                    console.log('Delete FAILED - Error: ' + err);
                    res.send('Delete FAILED - Error: ' + err);
                })
        } else {
            res.send('error in deleting the dream')
        }
    });

    app.post('/toggleDreamIsDone', (req, res) => {
        if (req.body.checkedDream) {
            dreamQuery
                .doc(req.body.checkedDream.id)
                .update({
                    isDone: !req.body.checkedDream.isDone.booleanValue
                })
                .then(ref => {
                    console.log('changed isDone');
                    return res.send("dream done toggle success");
                })
                .catch(err => {
                    res.send('dream done toggle failed:' + err)
                });
        } else {
            res.send('dream done toggle failed - body incorrect');
        }
    });

    app.post('/saveDreamImage', (req, res) => {
        if (req.files[0]) {
            const filePath = path.join('dreams_images/', req.files[0].originalname)
            storageRef
                .file(filePath)
                .save(req.files[0].buffer);
            storageRef
                .file(filePath)
                .getSignedUrl({action: 'read', expires: '03-09-2500'})
                .then((signedUrl) => {
                    return res.send(signedUrl[0]);
                })
                .catch(reason => {
                    console.log(reason);
                    res.send('failed to save image: ' + reason);
                });
        } else {
            res.send('no file found in request');
        }
    });
};

