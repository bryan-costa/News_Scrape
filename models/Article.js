module.exports = (Schema, model) => {
    const Article = new Schema({
        title: String,
        url: String,
        description: String
    })
    return model('Article', Article)
}
