const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();

const categoryOne = 'o6X72hMLWVq2EiQHHC1l';

const referenceCategory = dbFirebase.collection('categories').doc(categoryOne);

const createProduct = dbFirebase.collection('products').doc();
createProduct
    .set({
        product: 'Name product',
        categories: [referenceCategory],
        categoriesTwo: [categoryOne]
    })
    .then( snap => {
        console.log(snap)
    })
