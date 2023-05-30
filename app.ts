const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const watcher = require('./models/watchlistSchema')

// MongoDB connection
mongoose.connect('mongodb+srv://itsmenick30:Kc6JoDv6psSDUywE@cluster0.fjxcmon.mongodb.net/?retryWrites=true&w=majority')
// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'static')))
// Template Engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req: any, res: any) => {
    let params = {
        'title': 'Home'
    }
    res.status(200).render('home', params)
})

app.post('/', (req: any, res: any) => {
    const record = req.body
    console.log(record)
    let params = {
        'title': 'Home',
        'content': req.body.name + ' remember to watch '+ req.body.animeName
    }
    watcher.create(record)
    res.status(200).render('home', params)
})

app.get('/view', (req: any, res: any) => {
    let params = {
        'title': 'View Records'
    }
    res.status(200).render('view', params)
})

app.post('/view/getData', async (req: any, res: any) => {
    const record = await watcher.find({
        name: req.body.name
    })
    console.log(record)
    let params = {
        'title': 'View Records',
        'name': req.body.name,
        'record': record
    }
    res.status(200).render('viewData', params)
})

app.listen(80, () => {
    console.log('Server running')
})
