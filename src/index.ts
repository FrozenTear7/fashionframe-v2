import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello world!')
})

app.listen(3000, () => {
  console.log('The application is listening on port 3000!')
})
