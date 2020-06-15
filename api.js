const categories = require('./categories');
const products = require('./products');

categories.findAll().then(res => {
    console.log(res)
})

const insertCategory = async() => {

    await categories.createCategory({
        category: 'New oeder category'
    })

    const cat = await categories.findAll();
    console.log(cat)
}

const removeProducts = async() => {

    await products.remove('PASS ID TO DELETE');
}
