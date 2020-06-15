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

const addImages = async(id, data) => {

    const imageRef = db
        .collection('products')
        .doc(id)
        collection('images')
        .doc();

    await imageRef.set(data);
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

    await removeImages(id);

    const doc = db.collection('products').doc(id);
    await doc.delete();
}

const removeImages = async id => {

    const images = await db
        .collection('products')
        .doc(id)
        .collection('images')
        .get();

    const excludes = [];
    images.forEach(img => {
        excludes.push(db.collection('products').doc(id).collection('images').doc(img.id).delete());
    })

    await Promise.all(excludes);
}

module.exports = {
    create,
    addImages,
    update,
    remove
}
