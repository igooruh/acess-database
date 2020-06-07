const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();

const doc = dbFirebase.collection('catagories').doc('o6X72hMLWVq2EiQHHC1l');
doc
    .delete()
    .then( snap => console.log(snap))
    .catch( err => console.log(err));