const db = require('./services/firestore');
const admin = require('firebase-admin');

const findAll = async() => {

    const productsDB = await db.collection('products').get();

    if(productsDB.empty) {
        return [];
    }

    const products = []
    productsDB.forEach(doc => {
        products.push({
            ...doc.data(),
            id: doc.id
        });
    })

    const products2 = [];
    for await(product of products) {
        const imgs = [];
        const imgsDB = await db
        .collection('products')
        .doc(product.id)
        .collection('images')
        .get();

        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            });
        });

        products2.push({
            ...product,
            imgs
        });
    }

    return products2
}

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
    findAll,
    create,
    addImages,
    update,
    remove
}
