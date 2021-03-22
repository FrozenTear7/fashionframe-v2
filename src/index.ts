import app from './app'
import config from './config'

app.listen(config.port, () => {
  console.log(`Fashionframe server is running on port ${config.port}`)
})
