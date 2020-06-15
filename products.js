const db = require('./services/firestore');

const create = async ({ categories, ...data }) => {

    const doc = db.collection('products').doc();
    await doc.set({
        ...data,
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
