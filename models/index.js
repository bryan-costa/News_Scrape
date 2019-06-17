const {Schema, model} = require('mongoose')

const db = {
    Article: require('./Article.js')(Schema, model)
}

module.exports = db