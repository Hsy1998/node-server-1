const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({
  dest: 'uploads/'
})
const p = require('path')

const app = express()

app.options('/upload', cors())
app.get('/', (req, res) => {
  res.send('hello nodejs')
})

app.post('/upload', cors(), upload.single('file'), (req, res) => {
  let filename = req.file.filename
  let object = {
    id: filename
  }
  res.send(JSON.stringify(object))
})

app.get('/upload/:key', cors(), (req, res) => {
  res.sendFile(`upload/${req.params.key}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  }, (error) => {
    console.log(error);
  })
})

var port = process.env.PORT || 3000
app.listen(port)