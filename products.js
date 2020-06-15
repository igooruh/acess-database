const db = require('./services/firestore');

const create = async ({ categories, ...data }) => {

    const doc = db.collection('products').doc();
    const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat));
    await doc.set({
        ...data,
        categories: categoriesRefs,
        categories2: categories
    });
}

const update = async(id, data) => {

    const doc = db.collection('products').doc(id);
    await doc.update(data);
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
