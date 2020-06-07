const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://acess-database.firebaseio.com'
});

const dbFirebase = admin.firestore();
const PAGE_SIZE = 1

const categories = dbFirebase
                    .collection('catagories')
                    .orderBy('categories')
                    .limit(PAGE_SIZE + 1)
                    .startAfter('teste')
                    .get();

categories.then(snap => {

    let total = 0;

    snap.forEach(doc => {

        if(total < PAGE_SIZE) {
            console.log(doc.id, '==>', doc.data());
        }
        total++;
    })

    total > PAGE_SIZE ? console.log('has Next') : console.log("doest have next");
});