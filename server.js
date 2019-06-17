const express = require('express')
const { join } = require('path')
const axios = require('axios')
// const db = 
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')

app.get('/news', (req, res) => {
    axios.get('https://www.nhl.com')
        .then(({ data }) => {
            const $ = require('cheerio').load(data)
            let articleArr = []
            $('div.mixed-feed__item-header-text').each((i, elem) => articleArr.push({
                title: $(elem).children('a').children('h4').text(),
                url: `www.nhl.com${$(elem).children('a').attr('href')}`,
                description: $(elem).children('a').children('h5').text()
            }))
            db.news.insert(articleArr, e => e ? console.log(e) : res.sendStatus(200))
        })
        .catch(e => console.log(e))
})

require('mongoose').connect('mongodb://localhost/nhl_db', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
    .then(_ => app.listen(3000))
    .catch(e => console.log(e))