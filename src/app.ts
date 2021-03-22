import express from 'express'
import warframeRoutes from './routes/warframeRoutes'

const app = express()

app.use(express.json())

app.use('/api', warframeRoutes)

export default app
