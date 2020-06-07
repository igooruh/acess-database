const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();
const DOC_PRODUCT_ID = 'icWUpPrOmOftarZUoa33';
const imageRefence = dbFirebase
    .collection('products')
    .doc(DOC_PRODUCT_ID)
    .collection('images')
    .doc();

imageRefence
    .set({
        description: 'My first description image',
        url: 'url image'
    })
    .then( res => console.log(res))
    .catch( err => console.log(err));
