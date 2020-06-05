const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();
const productId = 'icWUpPrOmOftarZUoa33';

const produtsRef = dbFirebase.collection('products').doc(productId);
dbFirebase
    .collection('products')
    .doc(productId)
    .collection('images')
    .get()
    .then(imageSnapshot => {
        const exclusoes = [];
        imageSnapshot.forEach(img => {
            exclusoes.push(dbFirebase.collection('products').doc(productId).collection('images').doc(img.id).define);
        })

        return Promise.all(exclusoes);
    })
    .then(() => {
        return produtsRef.delete()
    })
    .then(() => console.log('Everything was deleted'));