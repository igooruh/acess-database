const categories = require('./categories');

categories.findAll().then(res => {
    console.log(res)
})