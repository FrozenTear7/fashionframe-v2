import express from 'express'
import config from './config'

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello world!')
})

app.listen(config.port, () => {
  console.log(`Fashionframe server is running on port ${config.port}`)
})
