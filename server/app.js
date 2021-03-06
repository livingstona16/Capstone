const knex = require('./database-connection')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { Model } = require('objection')

const routes = require('./routes/routes')

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use(routes)

app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err.stack : {}
  })
})

module.exports = app
