const db = require('./services/firestore');
const admin = require('firebase-admin');

const create = async ({ categories, ...data }) => {

    const doc = db.collection('products').doc();
    const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat));
    await doc.set({
        ...data,
        categories: categoriesRefs,
        categories2: categories
    });
}

const update = async(id, { categories, ...data }) => {

    const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat));
    const doc = db.collection('products').doc(id);
    await doc.update({
        ...data,
        categories: admin.firestore.FieldValue.arrayUnion(...categoriesRefs),
        categories2: admin.firestore.FieldValue.arrayUnion(...categories)
    });
}

const remove = async id => {

    const doc = db.collection('products').doc(id);
    await doc.delete();
}

module.exports = {
    create,
    update,
    remove
}
