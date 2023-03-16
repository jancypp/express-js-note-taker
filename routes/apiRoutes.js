const app = require("express").Router();
const fs = require("fs");
let db = require("../db/db.json");

app.get('/api/notes', (req, res) => {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || []
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    let newNote = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        text: req.body.text,
    }
    db.push(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err
    })
    res.json(db);
});

app.delete('/api/notes/:id', (req, res) => {
    let notDeletedNotes = []
    db.forEach(note => {
        if (note.id != req.params.id) {
            notDeletedNotes.push(note)
        }
    })
    console.log(notDeletedNotes,)
    db = notDeletedNotes
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err
    })
    res.json(db);
});



module.exports = app