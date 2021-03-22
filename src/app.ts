import express from 'express'
import warframeRoutes from './routes/warframe-routes'

const app = express()

app.use(express.json())

app.use('/api', warframeRoutes)

export default app
