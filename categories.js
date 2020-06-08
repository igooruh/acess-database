const db = require('./services/firestore');

const findAll = async() => {

    const categoriesDB = await db.collection('categories').get();

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

const findAllPagineted = async({ pageSize = 10, startAfter = '' }) => {

    const categoriesDB = await db
        .collection('categories')
        .orderBy('category')
        .limit(pageSize)
        .startAfter(startAfter)
        .get();

    if(categoriesDB.empty) {
        return {
            data: [],
            total: 0
        }
    }
    const categoriesPaginated = [];
    let total = 0;

    categoriesDB.forEach(doc => {
        if(total < pageSize) {
            categoriesPaginated.push({
                ...doc.data(),
                id: doc.id
            })
            total++;
        }
    })

    return {
        data: categories,
        total: categories.length
    }
}

const remove = async(id) => {

    const doc = db.collection('categories').doc(id);
    await doc.delete();
}

const createCategory = async data => {

    const create = db.collection('categories').doc();
    await create.set(data);
}

const updateCategory = async (id, data) => {

    const updateCat = db.collection('categories').doc(id);
    await updateCat.update(data);
}

module.exports = {
    findAll,
    findAllPagineted,
    remove,
    createCategory,
    updateCategory
}