const categories = require('./categories');

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
