console.log('Hello')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const app = express()
mongoose.connect('mongodb://localhost/karmadb').then(
  () => {
    console.log('connect to database successfully')
  },
  err => {
    console.log(`connection failled error ${err}`)
  }
)
mongoose.Promise = global.Promise
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
require('./routes')(app)
app.listen(config.port)
