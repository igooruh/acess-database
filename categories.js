const db = require('./services/firestore');

const findAll = async() => {

    const categoriesDB = await db.collection('catagories').get();

    if(categoriesDB.empty) {
        return [];
    }
    const categories = [];
    categoriesDB.forEach(doc => {
        categories.push({
            ...doc.data(),
            id: doc.id
        })
    })

    return categories;
}

const remove = async(id) => {

    const doc = db.collection('catagories').doc(id);
    await doc.delete();
}

module.exports = {
    findAll,
    remove
}