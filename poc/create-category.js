const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();

const createDoc = dbFirebase.collection('categories').doc();
createDoc
    .set({
        category: 'Category creating that code'
    })
    .then( snap => {
        console.log(snap)
    })
