const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();

const CATEGORY_ID = 'o6X72hMLWVq2EiQHHC1l';
const REFERENCE_CATEGORY = dbFirebase.collection('catagories').doc(CATEGORY_ID);
const products = dbFirebase
    .collection('products')
    .where('catagories', 'array-contains', REFERENCE_CATEGORY)
    .get();

products.then(snapshot => {
    console.log('is empty', snapshot.empty)
    snapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data())
        db
        .collection('products')
        .doc(doc.id)
        .collection('images')
        .get()
        .then(imgSnapshot => {
            imgSnapshot.forEach(img => {
            console.log(' img ==> ', img.id, ' => ', img.data())
            })
        })
    })
});