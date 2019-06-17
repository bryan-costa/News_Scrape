const express = require('express')
const { join } = require('path')
const axios = require('axios')
// const db = 
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)




require('mongoose').connect('mongodb://localhost/nhl_db', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
    .then(_ => app.listen(3000))
    .catch(e => console.log(e))