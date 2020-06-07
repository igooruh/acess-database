const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();

const categoryOne = 'o6X72hMLWVq2EiQHHC1l';

const referenceCategory = dbFirebase.collection('categories').doc(categoryOne);

const createProduct = dbFirebase.collection('products').doc('TCnveHtCNn17OC9A2t5M');
createProduct
    .update({
        product: 'Samsung 55"',
        price: 3500.61,
        categories: admin.firestore.FieldValue.arrayUnion(referenceCategory),
        categoriesTwo: admin.firestore.FieldValue.arrayUnion(categoryOne)
    })
    .then( snap => {
        console.log(snap)
    })