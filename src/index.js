const express = require("express")
const fs = require("fs")

require("./db/mongoose")

const Note = require("./models/note")

const app = express()

app.use(express.json())

// CRUD

app.post("/notes", async (req, res) => {
    const note = await new Note(req.body)

    try {
        await note.save()
        res.status(201).send(note)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find({})
        res.send(notes)
    } catch {
        res.status(500).send(err)
    }
})

app.patch("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        note.note = req.body.note

        await note.save()

        res.status(200).send(note)
    } catch (err) {
        res.status(404).send(err)
    }

})

app.delete("/notes/:id", async (req, res) => {
    
    try {
        const note = await Note.findByIdAndDelete(req.params.id)

        if (!note) {
            return res.status(404).send()
        }

        res.send("the note has been deleted")
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})