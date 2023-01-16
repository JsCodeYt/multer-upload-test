const express = require("express")
const multer = require("multer")
const path = require('path')
const dotenv = require("dotenv")


dotenv.config()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload")
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.name + path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })

const app = express()

app.use("/upload", express.static(path.join(__dirname + "/upload")))

app.get("/", (req, res) => {
    res.send("ok")
})


app.post("/", upload.single("file"), (req, res) => {
    res.status(200).json({ message: "upload your file !" })
})

app.listen("5000", () => {
    console.log("backend is running on port 5000")
})