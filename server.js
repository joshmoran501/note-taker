const express = require('express')
const database = require('./db/db.json')


var app = express()
var PORT = process.env.PORT || 3001

// access app on page load
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

// get, post, delete
app.get('/api/notes', (req, res) => res.json(database))

app.post('/api/notes', (req, res) => {
    database.push(req.body)
    res.json({
        message:'new note created',
        status: true
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const reqNote = database.find(x => x.id == req.params.id)

    database = database.filter(x => x.id != req.params.id)

    res.json({
        message: `note ${reqNote.id} successfully deleted`
    })
})



app.listen(PORT, () => {
    console.log(`Note Taker app listening at  http://localhost:${PORT}`)
})