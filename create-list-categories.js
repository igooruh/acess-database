const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();

const categories = dbFirebase.collection('catagories').get();
categories.then(snap => {
    snap.forEach(doc => {
        console.log(doc.id, '==>', doc.data())
    })
});