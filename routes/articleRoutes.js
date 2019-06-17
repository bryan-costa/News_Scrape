const { Article } = require('../models')
const axios = require('axios')


module.exports = app => {
    // Get new list of Articles from NHL.com
    app.get('/new_articles', (req, res) => {
        axios.get('https://www.nhl.com')
            .then(({ data }) => {
                const $ = require('cheerio').load(data)
                let articleArr = []
                $('div.mixed-feed__item-header-text').each((i, elem) => articleArr.push({
                    title: $(elem).children('a').children('h4').text(),
                    url: `www.nhl.com${$(elem).children('a').attr('href')}`,
                    description: $(elem).children('a').children('h5').text()
                }))
                Article.create(articleArr, e => e ? console.log(e) : res.sendStatus(200))
            })
            .catch(e => console.log(e))
    })
    // Get All articles from DB
    app.get('/article', (req, res) => {
        Article.find({}, (e, article) => e ? console.log(e) : res.json(article))
    })
    // Get One article from DB
    app.get('/article/:_id', (req, res) => {
        Article.findById(req.params._id, (e, article) => e ? console.log(e) : res.json(article))
    })
}