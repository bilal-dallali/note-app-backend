const express = require("express")
const fs = require("fs")

const app = express()

app.get("/notes", (req, res) => {
    fs.readFile()
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})